import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MiAuthService } from "src/app/core/services/mi-auth.service";
import { SessionService } from "src/app/core/services/session.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent {
  formularioLogin: FormGroup;
  errorMensaje: string|null=null;

  constructor(private fb: FormBuilder, 
    private session: SessionService, 
    private authService: MiAuthService) {
    this.formularioLogin = this.fb.group({
      nombreUsuario: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  enviarFormulario(): void {
    this.errorMensaje=null;
    const nombre = this.formularioLogin.get("nombreUsuario")?.value;
    const password = this.formularioLogin.get("password")?.value;

    


    this.authService.miLogin(nombre, password).subscribe({
      error:error=>{
        console.log(error);
        this.errorMensaje=error.message;
        console.log(this.errorMensaje);
      }
    }
      
    );
  }



}
