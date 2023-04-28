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
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent, ConfirmDialogModel } from "src/app/shared/confirm-dialog/confirm-dialog.component";
@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit, OnDestroy {
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
    private route: ActivatedRoute,
    private usersService: UsersService,
    private fb: FormBuilder,
    private dialog:MatDialog
  ) {
    this.userForm = this.createUserForm();
  }

  ngOnInit(): void {
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
      roles: this.fb.array([this.fb.control("", Validators.required)]),
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
    this.userForm.patchValue({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      fechaNacimiento: user.fechaNacimiento,
      provincia: user.provincia,
    });

    const rolesArray = this.fb.array(
      user.roles.map((role) => this.fb.control(role, Validators.required))
    );
    this.userForm.setControl("roles", rolesArray);
  }

  /**
   * Obtiene el FormArray de roles del formulario `userForm`.
   *
   * @returns {FormArray} El FormArray de roles asociado al formulario.
   */
  get roles(): FormArray {
    return this.userForm.get("roles") as FormArray;
  }

  /**
   * Añade un nuevo control de formulario vacío al FormArray de roles
   * en el formulario `userForm`
   */
  addRole(): void {
    const roles = this.userForm.get("roles") as FormArray;
    roles.push(this.fb.control("", Validators.required));
  }

  /**
   * Elimina un rol en el FormArray del formulario `userForm`
   * en la posición especificada por el index
   *
   * @param {number} index - Índice del rol que se eliminará.
   */
  removeRole(index: number): void {
    const dialogData=new ConfirmDialogModel('Eliminar rol', '¿Seguro?', `rol numero${index+1}`);
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{panelClass:'mi-dialogo-personalizado', data:dialogData});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        const roles = this.userForm.get("roles") as FormArray;
        roles.removeAt(index);
    }});
    
  }

  onSubmit() {
    const updatedUser = this.userForm.value;

    this.user.id = updatedUser.id;
    this.user.nombre = this.userForm.value.nombre;
    this.user.email = updatedUser.email;
    this.user.fechaNacimiento = updatedUser.fechaNacimiento;
    this.user.provincia = updatedUser.provincia;
    this.user.roles = updatedUser.roles;
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
