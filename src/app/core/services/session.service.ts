import { Injectable } from "@angular/core";

import { MiAuthService } from "./mi-auth.service";
import jwtDecode from "jwt-decode";
import { miApplicationUser } from "src/app/features/users/models/aplication.users";
import { BehaviorSubject, Observable, of } from "rxjs";
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
  private _currentUser$:BehaviorSubject<miApplicationUser|null>;
  private _tokenActual: string | null = null;
  private _currentUser!: miApplicationUser|null;
//Aquí llamo a authService para obtener el token
  constructor(private authService: MiAuthService) {
    this.authService.authToken.subscribe((token) => {
      //Con la linea de abajo, en realidad estoy llamando a set token
      this.token=token;
    });
    //Creo una instancia del objeto behaviorSubject con valor inicial null
    this._currentUser$	=new BehaviorSubject<miApplicationUser|null>(null)

  }
   private set token(token:string|null){
    this._tokenActual=token;
    if (token) {
      // a) Almacenarlo en el session storage o en el local storage (lo dejo a tu elección, pero intenta hacerlo de tal forma que se pueda cambiar facil)
      sessionStorage.setItem("authToken", token);
      //b) Decodificar el token para sacar los claims necesarios para crear un ApplicationUser
      const decodedToken:any=jwtDecode(token);
      const user:miApplicationUser={
        id:decodedToken.id,
        nombre:decodedToken.nombre,
        correo:decodedToken.correo,
        roles:decodedToken.roles
      };
      //c) Almacenar este ApplicationUser también en session storage o local storage
      sessionStorage.setItem('currentUser',JSON.stringify(user));
      this._currentUser=user;
      //Emito el nuevo usuario a traves del subject
      this._currentUser$.next(user);
      console.log(this._currentUser);

    }
   }
   //Propiedad get para recuperar el token 
   get tokenActual():string|null{
    return this._tokenActual
   }


//propiedad get para recuperar el usuario actual
  get currentUser(): miApplicationUser|null {
    return this._currentUser;
  }
  //Propiedad para informar al mundo del usuario que hay en la session
  //Al proporcionar el  private currentUser$ como observable a través del get me aseguro que solo se va a poder manipular dentro del sessionService
  get currentUser$():Observable<miApplicationUser|null>{
    return this._currentUser$.asObservable();
  }
//El operador != realiza una comparacion y devuelve true o false.
//Es como hacerlo con un if(){}
  get isLogged():boolean{
    return this._currentUser!==null;
  }

  isInRole(rol:string):boolean{
    const roles:string[]|undefined=this._currentUser?.roles;
    return roles ?roles.some(r=>r===rol):false;
  }
//6.- Un método initialize() que compruebe si hay un token en el storage y si lo hay realice todo el proceso como si el token lo hubiesemos obtenido mediante el login
  // initialize(){
  //   const mitoken=sessionStorage.getItem('authToken');
  //   if (mitoken){
  //     this.token=mitoken
  //   }
  // }





}
