import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiAuthRoutingModule } from './mi-auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    MiAuthRoutingModule
  ]
})
export class MiAuthModule { }
