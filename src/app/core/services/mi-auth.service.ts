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
  private _tokenSubject=new BehaviorSubject<string|null>(null);
  private _token: string|null=null;
  elegirToken:string|null=null;
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
 * Si no encuentra un usuario que coincida, arroja un error.
 *
 * Como estamos en pruebas, se genera el token en el lado del cliente.Cuando todo funcione intentaré pasarlo al backend.
 * El token no se genera, porque no puedo generarlo en angular. creo dos con jwt.io y dependiendo del usuario que se hay identificado, se establece uno u otro.
 */
  miLogin(nombre: string, password: string):Observable<string> {
    return this.http.get<any[]>('assets/data/miUsuario.json').pipe(
      map((usuarios)=>{
        const usuario=usuarios.find(
          (u)=> u.nombre===nombre && u.password===password
        );
        if (usuario){
          if (usuario.nombre==='Sergio'){

            this.elegirToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJub21icmUiOiJTZXJnaW8iLCJjb3JyZW8iOiJzZXJnaW9AZ21haWwuY29tIiwicm9sZXMiOlsiYWRtaW5pc3RyYWRvciIsImRpcmVjdG9yIl0sImlhdCI6MTUxNjIzOTAyMn0.rrS27yZHqDa5oo2mNd2g5QKVDqvK-ebt0DVlMnzTlXs'
          } else{
            this.elegirToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJub21icmUiOiJMb2xpIiwiY29ycmVvIjoibG9saUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc3VhcmlvIiwiZGlyZWN0b3IiXSwiaWF0IjoxNTE2MjM5MDIyfQ.MrXoYOMCACkdoOnUI8El-RRD98-MD288NMk-KpmlEyU'

          }

          
          
          this._token=this.elegirToken;
          this._tokenSubject.next(this._token)
          console.log(this.elegirToken);
          this.router.navigate(['/dashboard'])
          return this._token
        }
        else {
          throw new Error('Usuario o contraseña incorrecta');
        }
      })
    )
  }



  
  //aqui establezco un get para tener acceso desde  sessionService al token.
  //Nota:No se me ocurre otra forma.¿y si this._token fura un observable directamente? TODO
  get authToken():Observable<string|null>{
    return this._tokenSubject.asObservable();
  }
}
