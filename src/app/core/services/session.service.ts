import { Injectable, OnInit } from "@angular/core";

import { MiAuthService } from "./mi-auth.service";
import jwtDecode from "jwt-decode";
import { miApplicationUser } from "src/app/features/users/models/aplication.users";
import { BehaviorSubject, Observable, of } from "rxjs";
import {  Router } from "@angular/router";
export interface ApplicationUser {
  id: string;
  displayName: string;
  roles: string[];
}

/**
 * Servicio para mantener la información de sesión. Te pongo aquí lo que quiero que tenga este servicio
 * 1.- Una propiedad set para poder establecer el token de autorización cuando se haga un login correcto. Al pasarle el token
 * tiene que:
 *  a) Almacenarlo en el session storage o en el local storage (lo dejo a tu elección, pero intenta hacerlo de tal forma que se pueda cambiar facil)
 *  b) Decodificar el token para sacar los claims necesarios para crear un ApplicationUser
 *  c) Almacenar este ApplicationUser también en session storage o local storage
 *  d) Informar al 'mundo' del usuario  que hay en la sesión
 * 1bis.- Una propiedad get para recuperar el token
 * 2.- Una propiedad get (currentUser) que devuelva el usuario actual (o null si no hay usuario)
 * 3.- Una propiedad get (currentUser$) que devuelva un observable de ApplicationUser para quien quiera suscribirse para enterarse de cuando hay un cambio de usuario
 * 4.- Una propiedad get (isLogged) que devuelva true o false dependiendo de si hay usuario logado o no
 * 5.- Un método (isInRole(role: string)) que devuelva true o false dependiendo de si el usuario tiene el rol indicado o no
 * 6.- Un método initialize() que compruebe si hay un token en el storage y si lo hay realice todo el proceso como si el token lo hubiesemos obtenido mediante el login
 * 7.- Un método (logout()) para llamarlo cuando queramos hacer logout
 * Una vez que tengas esto hay que:
 * 1.- Cambiar el componente de login para utilizar este servicio
 * 2.- Cambiar los guards para utilizar este servicio (el auth.guard y el admin.guard)
 * 3.-
 */
@Injectable({
  providedIn: "root",
})
export class SessionService {
  private _currentUser$: BehaviorSubject<miApplicationUser | null>;
  private _tokenActual: string | null = null;
  private _currentUser: miApplicationUser | null=null



  //Aquí llamo a authService para obtener el token
  constructor(private authService: MiAuthService,
    private router:Router) {
    
    this.authService.authToken.subscribe((token) => {
      //Con la linea de abajo, en realidad estoy llamando a set token
      this.token = token;
    });
    //Creo una instancia del objeto behaviorSubject con valor inicial null
    this._currentUser$ = new BehaviorSubject<miApplicationUser | null>(null);
  }


  /**
 * Setter para la propiedad 'token'. Este método realiza varias operaciones cuando se establece un nuevo token:
 *
 * Recibe un argumento que puede ser una cadena de texto que representa un token o null.
 *
 * Si se pasa un token válido (una cadena de texto), este método:
 * a) Almacena el token en el session storage del navegador. De esta manera, el token queda accesible para futuras sesiones.
 * b) Decodifica el token utilizando la librería jwtDecode para obtener los claims necesarios para crear un objeto ApplicationUser. Este objeto incluye id, nombre, correo y roles del usuario autenticado.
 * c) Almacena el objeto ApplicationUser en el session storage del navegador, permitiendo un acceso rápido a los datos del usuario en sesiones futuras.
 * d) Actualiza la propiedad interna '_currentUser' con el nuevo objeto ApplicationUser y emite este nuevo valor a través del subject '_currentUser$' para que cualquier suscriptor sea notificado del cambio de usuario.
 *
 * Este método no realiza ninguna acción si se pasa null en lugar de un token.
 *
 * Es útil en los casos en los que se ha obtenido un nuevo token, por ejemplo, después de que un usuario se autentique o renueve su sesión.
 */
  private set token(token: string | null) {
    this._tokenActual = token;
    if (token) {
      // a) Almacenarlo en el session storage o en el local storage (lo dejo a tu elección, pero intenta hacerlo de tal forma que se pueda cambiar facil)
      sessionStorage.setItem("authToken", token);
      //b) Decodificar el token para sacar los claims necesarios para crear un ApplicationUser
      const decodedToken: any = jwtDecode(token);
      const user: miApplicationUser = {
        id: decodedToken.id,
        nombre: decodedToken.nombre,
        correo: decodedToken.correo,
        roles: decodedToken.roles,
      };
      //c) Almacenar este ApplicationUser también en session storage o local storage
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      this._currentUser = user;
      //Emito el nuevo usuario a traves del subject
      this._currentUser$.next(user);
      console.log(this._currentUser);
    }
  }
  //Propiedad get para recuperar el token
  get tokenActual(): string | null {
    return this._tokenActual;
  }

  //propiedad get para recuperar el usuario actual
  get currentUser(): miApplicationUser | null {
    return this._currentUser;
  }
  //Propiedad para informar al mundo del usuario que hay en la session
  //Al proporcionar el  private currentUser$ como observable a través del get me aseguro que solo se va a poder manipular dentro del sessionService
  get currentUser$(): Observable<miApplicationUser | null> {
    return this._currentUser$.asObservable();
  }
  get isLogged(): boolean {
    //El operador != realiza una comparacion y devuelve true o false.
    //Es como hacerlo con un if(){}
    return this._currentUser !== null;
  }



/**
 * Este método comprueba si el usuario actual tiene un rol específico.
 *
 * Recibe un argumento de tipo string que representa el rol a comprobar.
 *
 * Primero, obtiene los roles del usuario actual. Si el usuario tiene roles, 
 * utiliza el método 'some' para comprobar si alguno de los roles del usuario coincide 
 * con el rol proporcionado. Si se encuentra una coincidencia, el método devuelve 'true'. 
 * Si no se encuentra ninguna coincidencia, o si el usuario no tiene roles, el método devuelve 'false'.
 *
 * Este método es útil para la implementación de la seguridad basada en roles en la aplicación, 
 * permitiendo mostrar u ocultar características o funcionalidades en función del rol del usuario.
 */
  isInRole(rol: string): boolean {
    const roles: string[] | undefined = this._currentUser?.roles;
    return roles ? (roles.some((r) => r === rol)) : false;
  }



  //6.- Un método initialize() que compruebe si hay un token en el storage y si lo hay realice todo el proceso como si el token lo hubiesemos obtenido mediante el login

  /**
 * Este método inicializa la sesión del usuario. 
 * 
 * Primero, busca un token de autenticación en el sessionStorage. Si encuentra el token de autenticacion, 
 * lo establece en el servicio de sesión y navega hacia el dashboard.
 * 
 * De esta manera, si un usuario ya autenticado recarga la página 
 *  no tendrá que pasar por el proceso de inicio de sesión de nuevo; 
 * en su lugar, su sesión será restaurada automáticamente.
 * 
 * Nota: Este método se llama al inicio de la aplicación para asegurarse de que cualquier 
 * información de la sesión existente se restaure de inmediato.
 */
  initialize() {
    const mitoken = sessionStorage.getItem('authToken');
    
    if (mitoken ) {
      this.token = mitoken;
      this.router.navigate(['/dashboard'])
      
    }
  }
  logOut(){
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
    
  }
  
}