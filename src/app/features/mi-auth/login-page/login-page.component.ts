import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, catchError, delay, filter, of, switchMap } from "rxjs";
import { GuiUtilsService } from "src/app/core/services/gui-utils.service";
import { MiAuthService } from "src/app/core/services/mi-auth.service";
import { SessionService } from "src/app/core/services/session.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent {
  formularioLogin: FormGroup;
  errorMensaje: string | null = null;

  constructor(
    private gui: GuiUtilsService,
    private fb: FormBuilder,
    private session: SessionService,
    private authService: MiAuthService
  ) {
    this.formularioLogin = this.fb.group({
      nombreUsuario: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  enviarFormulario(): void {
    const numero: number = 7 / 0;

    this.errorMensaje = null;
    const nombre = this.formularioLogin.get("nombreUsuario")?.value;
    const password = this.formularioLogin.get("password")?.value;

    this.authService
      .miLogin(nombre, password)
      .pipe(
        catchError((error: any) => {
          return this.gui.confirm$(
            "Login incorrecto. ¿Quiere volver a intentarlo?"
          );
        }),
        switchMap((resultado: string | boolean) => {
          if (resultado === true) {
            return this.authService.miLogin("Sergio", "Callejas");
          } else if (resultado === false) {
            return of(null);
          } else {
            return of(resultado as string);
          }
        }),
        catchError((error: any) => {
          debugger;
          return of(null);
        })
      )
      .subscribe((token: string | null) => {
        if (!token) {
          this.errorMensaje = "Login incorrecto";
        }
      });      

      this.retrasa(5000).subscribe(()=>{
        console.log('lo que sea')
      });

    // this.authService.miLogin(nombre, password).subscribe({
    //   next: (r: any) => { console.log('todo ha ido bien')},
    //   error: (error) => {

    //     console.log(error);
    //     this.errorMensaje = error.message;
    //     console.log(this.errorMensaje);
    //   },
    // });

    // try{
    //   const saludo = this.saluda('Loli');
    //   this.gui.confirm$(saludo);
    // }catch(e){
    //   console.error(e);
    //   this.gui.confirm$(e as string);
    // } finally{
    //   console.log('En el finally de prueba');
    // }

    // this.authService.miLogin(nombre, password).
    // subscribe({
    //   error:error=>{
    //     console.log(error);
    //     this.errorMensaje=error.message;
    //     console.log(this.errorMensaje);
    //   }
    // }

    // );
  }

  saluda(nombre: string): string {
    // return `Hola, ${nombre}`;
    throw new Error("Se ha producido un error provocado por nosotros");
  }



  retrasa(milisegundos: number): Observable<never>{


   
    return of().pipe(delay(milisegundos));
  };
  

}


// export interface IntentoLogin{
  
//   usuario: string;
//   password: string;
// }

export interface LoginResult {
  ok: boolean;
  mensaje:string;
}
