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

  constructor(private fb: FormBuilder, 
    private session: SessionService, 
    private authService: MiAuthService) {
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
// login() {
//   const email = this.loginForm.get('email')?.value;
//   const password = this.loginForm.get('password')?.value;
//   const rememberMe = this.loginForm.get('rememberMe')?.value;

//   this.loading = true;
//   this.authenticationService
//       .login(email.toLowerCase(), password)
//       .subscribe(
//           data => {
//               if (rememberMe) {
//                   localStorage.setItem('savedUserEmail', email);
//               } else {
//                   localStorage.removeItem('savedUserEmail');
//               }
//               this.router.navigate(['/']);
//           },
//           error => {
//               this.notificationService.openSnackBar(error.error);
//               this.loading = false;
//           }
//       );
// }