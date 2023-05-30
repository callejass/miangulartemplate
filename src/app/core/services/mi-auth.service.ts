import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, find, map, of } from "rxjs";
import { miApplicationUser } from "src/app/features/users/models/aplication.users";
import { User } from "src/app/features/users/models/user.model";
import { environment } from "src/environments/environment";
import { ApplicationUser,  } from "./session.service";
import * as jwt from 'jsonwebtoken'

@Injectable({
  providedIn: "root",
})
export class MiAuthService {
  private _token: string|null=null;
  constructor(private http: HttpClient, private router:Router ) {}

  sergioLogin(userId: string, password: string): Observable<string> {
    const url: string = environment.apiUrl + '/login';
    return this.http.post(url,{user: userId, password: password}).pipe(
      map((r: any) => {
        if(r.ok){
          return r.token;
        } else { 
          return null;
        }
      })
    )
  }


  


  /**
 * Función para autenticar al usuario y generar un JWT si el login es exitoso.
 *
 * @param {string} nombre - El nombre del usuario a autenticar.
 * @param {string} password - La contraseña del usuario a autenticar.
 *
 * @returns {Observable<string | null>} Un Observable que emite el JWT si el login es exitoso,
 * o `null` si no se encuentra ningún usuario que coincida con las credenciales proporcionadas.
 *
 * La función realiza una solicitud HTTP GET para obtener un array de usuarios de un archivo JSON local.
 * Luego busca un usuario en ese array que coincida con el nombre y la contraseña proporcionados.
 *
 * Si encuentra un usuario que coincida, genera un JWT utilizando jsonwebtoken y lo retorna.
 * Si no encuentra un usuario que coincida, retorna `null`.
 *
 * Como estamos en pruebas, se genera el token en el lado del cliente.Cuando todo funcione intentaré pasarlo al backend
 */
  miLogin(nombre: string, password: string):Observable<string|null> {
    return this.http.get<any[]>('assets/data/miUsuario.jason').pipe(
      map((usuarios)=>{
        const usuario=usuarios.find(
          (u)=> u.nombre===nombre && u.password===password
        );
        if (usuario){
          const token=jwt.sign([usuario.id,usuario.nombre,usuario.correo,usuario.roles],'laclave');
          this._token=token;
          console.log(token);

          return token
        }
        else {
          return null
        }
      })
    )
  }
  
  //aqui establezco un get para tener acceso desde  sessionService al token.
  //Nota:No se me ocurre otra forma.¿y si this._token fura un observable directamente? TODO
  get authToken():Observable<string|null>{
    return of(this._token);
  }
}
