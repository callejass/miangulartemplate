import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Provincia, Rol, User } from "../../models/user.model";
import { UsersService } from "../../services/users.service";
import { Subscription } from "rxjs";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { formatDate } from "@angular/common";
import { format, parse, set } from "date-fns";
import { TablasMaestrasService } from "src/app/core/services/tablas-maestras.service";
import { FechasService } from "src/app/core/services/fechas.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit, OnDestroy {
  listaRoles: Rol[] = [];
  listaProvincias: Provincia[] = [];
  mode: string | null | undefined;
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
  editMode: boolean = false;
  constructor(
    private tablasMaestras: TablasMaestrasService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private fechas: FechasService
  ) {
    this.userForm = this.createUserForm();
  }

  ngOnInit(): void {
    this.tablasMaestras
      .getData<Provincia>("provincias")
      .subscribe((provincias) => {
        this.listaProvincias = provincias;
      });
    this.tablasMaestras.getData<Rol>("roles").subscribe((roles) => {
      this.listaRoles = roles;
    });
    this.getParams();
    if (this.mode === "edicion" || this.mode === "vista") {
      this.getUserData(this.userId);
      this.setUserData(this.user);
    }

    if (this.mode === "vista") {
      this.userForm.disable();
    }
    console.log(this.editMode);
  }
  /**
   * Crea y devuelve un FormGroup para el formulario de usuario.
   * Inicializa un formulario con los siguientes campos:
   * id, nombre,email,fechaNacimiento, provincia y roles
   * @returns {FormGroup} FormGroup para el formulario de usuario.
   */
  createUserForm(): FormGroup {
    return this.fb.group({
      id: ["", Validators.required],
      nombre: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      fechaNacimiento: ["", Validators.required],
      provincia: ["", Validators.required],
      roles: [[], Validators.required],
    });
  }

  /**
   * Obtiene los parámetros de la ruta y asigna valores a las variables de la clase.
   *
   * Se suscribe al paramMap del ActivatedRoute para obtener y actualizar los valores
   * de 'id' y 'mode'. También determina si el componente está en modo de edición o vista.
   *
   * - Si el modo es 'edicion' o 'crear', se establece el editMode en true.
   * - En otros casos, el editMode se establece en false (modo de vista).
   */
  getParams(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get("id") || "";
      const mode = paramMap.get("mode");
      this.mode = mode;
      this.editMode = mode === "edicion" || mode === "crear";
    });
  }

  /**
   * Obtiene los datos del usuario por su ID y asigna el resultado al objeto `user`.
   *
   * @param {string} userId - El ID del usuario que se desea obtener.
   */
  getUserData(userId: string): void {
    this.usersService.get(userId).subscribe({
      next: (user: User) => {
        this.user = user;
      },
    });
  }

  /**
   * Introduce los datos del usuario en el formulario `userForm`.
   * Crea y asigna un FormArray de roles al formulario, utilizando
   * los roles del usuario proporcionado.
   *
   * @param {User} user - El usuario del que consigo los datos para el formulario.
   */
  setUserData(user: User): void {
    const provincia = this.listaProvincias.find(
      (provincia) => provincia.codigo === user.provincia
    );
    this.userForm.patchValue({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      fechaNacimiento: user.fechaNacimiento,
      provincia: user.provincia,
      roles: user.roles,
    });
    console.log(this.userForm);
  }
  onSubmit() {
    const updatedUser = this.userForm.value;

    this.user.id = updatedUser.id;
    this.user.nombre = this.userForm.value.nombre;
    this.user.email = updatedUser.email;
    this.user.provincia = updatedUser.provincia;
    this.user.roles = updatedUser.roles;
    // Convertir la fecha de nacimiento al formato deseado
    if (updatedUser.fechaNacimiento) {
      const formattedDate = format(updatedUser.fechaNacimiento, "yyyy-MM-dd");
      updatedUser.fechaNacimiento = formattedDate;
      this.user.fechaNacimiento = updatedUser.fechaNacimiento;
      console.log(this.userForm.value);
    }
    if (this.mode === "edicion") {
      this.usersService.update(this.user);
    } else {
      this.usersService.create(this.user);
    }
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }
}
