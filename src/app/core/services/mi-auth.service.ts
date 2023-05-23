import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, find, map } from "rxjs";
import { User } from "src/app/features/users/models/user.model";

@Injectable({
  providedIn: "root",
})
export class MiAuthService {
  constructor(private http: HttpClient, private router:Router) {}
  usuarioAutenticado!: User | null;
  miLogin(nombre: string, password: string): Observable<User|null>{
    return this.http.get<User[]>('assets/data/mocks/users-mock.json').pipe(
      map((usuarios) => {
        let usuario = usuarios.find(
          (u) => u.nombre === nombre && u.provincia === password
        );
        console.log(usuario);
        if (usuario) {
          localStorage.setItem("usuario", JSON.stringify(usuario));
          localStorage.setItem("token", "123456789");
          let admin=usuario.roles.find(rol=>rol==='1');
          if (admin){
            localStorage.setItem('administrador','true')
          }
          
          this.router.navigate(['/dashboard'])
          return usuario;
        } else {
          return null;
        }
      }),
        
      
    );
  }
  miGetToken(){
    
    return localStorage.getItem('token');
  }

  miGetUsuario(): User | null {
    let usuarioString= localStorage.getItem("usuario");
    if (usuarioString!==null){
      let usuarioAutenticado=JSON.parse(usuarioString);
      return usuarioAutenticado
    } else return null
  };
  miLogOut():void{
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('administrador');
    
    
  }
}
