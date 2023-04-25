import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { User } from "../../models/user.model";
import { UsersService } from "../../services/users.service";
import { Subscription } from "rxjs";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit, OnDestroy {
  user: User = {
    id: "",
    nombre: "",
    email: "",
    fechaNacimiento: "",
    provincia: "",
    roles: [],
  };
  userForm: FormGroup;
  userId: string = "";
  paramMapSubscription: Subscription = new Subscription();
  editMode: boolean | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    //Creo el formulario
    this.userForm = this.fb.group({
      id: ["", Validators.required],
      nombre: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      fechaNacimiento: ["", Validators.required],
      provincia: ["", Validators.required],
      roles: this.fb.array([this.fb.control("", Validators.required)]),
    });
  }

  ngOnInit(): void {
    //Obtengo el id y el modo del detalle(vista o edición)
    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get("id") || "";
      const mode = paramMap.get("mode");

      this.editMode = mode === "edicion";
    });

    //Me suscribo al servicio con el id obtenido para obtener el usuario
    this.usersService.get(this.userId).subscribe({
      next: (user: User) => {
        this.user = user;//Esta linea se puede sustituir por: this.setUserData(user)
        //llamo a la funcion que asigna los valores del usuario en el formulario
        this.setUserData(this.user);
      },
    });
    if (!this.editMode) {
      this.userForm.disable();
    }
  }
  /**
   * Este método actualiza los valores del formulario
   * @param user (El usuario devuelto por el usersService)
   */
  setUserData(user: User): void {
    this.userForm.patchValue({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      fechaNacimiento: user.fechaNacimiento,
      provincia: user.provincia,
    });

    const roles = this.userForm.controls["roles"] as FormArray;

    user.roles.forEach((role: string) => {
      roles.push(this.fb.control(role));
    });
  }
  /**
   * Devuelve 
   */
  get roles(): FormArray {
    return this.userForm.get("roles") as FormArray;
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }
}
