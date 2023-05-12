import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UserListComponent } from "./user-list/user-list.component";
import { SharedModule } from "src/app/shared/shared.module";

import { DetailPageComponent } from "./pages/detail-page/detail-page.component";
import { DetailComponent } from "./components/detail/detail.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { MatTableModule } from "@angular/material/table";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { CustomDateAdapter } from "./adaptadorFechapersonalizado";
import { CUSTOM_DATE_FORMATS } from "src/app/app.module";



@NgModule({
  imports: [CommonModule, SharedModule, UsersRoutingModule, MatTableModule],
  providers: [{ provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: LOCALE_ID, useValue: 'en-GB' }],
  declarations: [
    UserListComponent,
    HomePageComponent,
    DetailPageComponent,
    UsersListComponent,
    DetailComponent,
  ],
})
export class UsersModule {}
