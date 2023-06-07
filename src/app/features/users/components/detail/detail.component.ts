import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Provincia, Rol, User } from "../../models/user.model";
import { UsersService } from "../../services/users.service";
import { Subscription, filter, switchMap, tap } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { formatISO, parseISO } from "date-fns";
import { TablasMaestrasService } from "src/app/core/services/tablas-maestras.service";
import { idUnicoValidador } from "src/app/shared/validators/idUnicoValidador";
import { GuiUtilsService } from "src/app/core/services/gui-utils.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit, OnDestroy {
  guardado:boolean=false;
  titulo:string="Nuevo usuario"
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
  userForm!: FormGroup;
  userId: string = "";
  paramMapSubscription: Subscription = new Subscription();
  editMode: boolean = false;
  constructor(
    private tablasMaestras: TablasMaestrasService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private fb: FormBuilder,
    private gui: GuiUtilsService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.createUserForm();
this.guardado=false;
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

      // Deshabilitar el campo 'id' si el modo es 'edicion'
      if (this.mode === "edicion") {
        this.userForm.get("id")?.disable();
        this.titulo="Editar usuario"
      }
      if (this.mode === "vista") {
        this.userForm.disable();
        this.titulo="Detalle de usuario"
      }
    }
  }
  /**
   * Crea y devuelve un FormGroup para el formulario de usuario.
   * Inicializa un formulario con los siguientes campos:
   * id, nombre,email,fechaNacimiento, provincia y roles
   * @returns {FormGroup} FormGroup para el formulario de usuario.
   */
  createUserForm(): FormGroup {
    return this.fb.group({
      id: [
        "",
        {
          validators: [Validators.required],
          asyncValidators: [idUnicoValidador(this.usersService)],
          updateOn: "change",
        },
      ],

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
        const fecha = parseISO(this.user.fechaNacimiento);
        this.user.fechaNacimiento = formatISO(fecha, {
          representation: "date",
        });
        this.setUserData(this.user);
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
      roles: user.roles,
    });
    console.log(this.userForm.value);
  }

  establecerValores() {
    const updatedUser = this.userForm.getRawValue();
    this.user.id = updatedUser.id;
    this.user.nombre = this.userForm.value.nombre;
    this.user.email = updatedUser.email;

    // obtén el valor del campo de fecha
    const fecha = this.userForm.get("fechaNacimiento")?.value;

    // comprueba si la fecha es un objeto Date
    if (fecha instanceof Date) {
      // si es un objeto Date, formatea como string 'yyyy-MM-dd'
      this.user.fechaNacimiento = formatISO(fecha, { representation: "date" });
    } else if (typeof fecha === "string") {
      // si es una cadena, asume que ya está en el formato correcto
      this.user.fechaNacimiento = fecha;
    }

    this.user.provincia = updatedUser.provincia;
    this.user.roles = updatedUser.roles;
    this.guardado=true;
  }

volver(){
  if (this.editMode && this.guardado===false){
    
    this.gui.confirm$('Va a abandonar la página sin guardar los cambios, está seguro?').
    subscribe(respuesta=>{
      if (respuesta===true){
        this.router.navigate(['/users'])
      }
    })
  } else {
      this.router.navigate(['/users'])

    }
    
  }

  onSubmit() {
    this.establecerValores();
   

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
