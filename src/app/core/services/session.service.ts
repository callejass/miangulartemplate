import { Injectable } from '@angular/core';

export interface ApplicationUser{
    id: string;
    displayName: string;
    roles: string[]
}




/**
 * Servicio para mantener la información de sesión. Te pongo aquí lo que quiero que tenga este servicio
 * 1.- Una propiedad set para poder establecer el token de autorización cuando se haga un login correcto. Al pasarle el token 
 * tiene que: 
 *  a) Almacenarlo en el session storage o en el local storage (lo dejo a tu elección, pero intenta hacerlo de tal forma que se pueda cambiar facil)
 *  b) Decodificar el token para sacar los claims necesarios para crear un ApplicationUser
 *  c) Almacenar este ApplicationUser también en session storage o local storage
 *  d) Informar al 'mundo' del usuario que que hay en la sesión
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
  providedIn: 'root'
})
export class SessionService {



  constructor() { }


  private _currentUser!: ApplicationUser;

  get currentUser(): ApplicationUser{
    return this._currentUser;
  }
  
  set user(value: ApplicationUser){
    this._currentUser=value;  
  }

  set token(value: string){

  }



}
