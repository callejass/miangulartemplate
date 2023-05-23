import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MiAuthService {
  constructor(private http: HttpClient, private router:Router) {}

  miLogin(nombre: string, password: string): Observable<any> {
    return this.http.get<any[]>("/assets/data/miUsuario.json").pipe(
      map((usuarios) => {
        let usuario = usuarios.find(
          (u) => u.nombre === nombre && u.password === password
        );
        if (usuario) {
          localStorage.setItem("usuario", nombre);
          localStorage.setItem("token", "123456789");
          this.router.navigate(['/dashboard'])
          return usuario;
        } else {
          return null;
        }
      })
    );
  }
  miGetToken(): string | null {
    return localStorage.getItem("token");
  };
  miLogOut():void{
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    
  }
}
