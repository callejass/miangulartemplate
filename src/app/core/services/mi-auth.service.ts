import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MiAuthService {
  constructor(private http: HttpClient) {}

  miLogin(nombre: string, password: string): Observable<any> {
    return this.http.get<any[]>("/assets/data/miUsuario.json").pipe(
      map((usuarios) => {
        let usuario = usuarios.find(
          (u) => u.nombre === nombre && u.password === password
        );
        if (usuario) {
          sessionStorage.setItem("usuario", nombre);
          sessionStorage.setItem("token", "123456789");
          return usuario;
        } else {
          return null;
        }
      })
    );
  }
  miGetToken(): string | null {
    return sessionStorage.getItem("token");
  }
}
