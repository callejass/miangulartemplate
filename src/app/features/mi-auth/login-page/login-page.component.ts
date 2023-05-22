import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MiAuthService } from "src/app/core/services/mi-auth.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent {
  formularioLogin: FormGroup;

  constructor(private fb: FormBuilder, private authService: MiAuthService) {
    this.formularioLogin = this.fb.group({
      nombreUsuario: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  enviarFormulario(): void {
    const nombre = this.formularioLogin.get("nombreUsuario")?.value;
    const password = this.formularioLogin.get("password")?.value;
    this.authService.miLogin(nombre, password).subscribe();
  }
}
