import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UserListComponent } from "./user-list/user-list.component";
import { SharedModule } from "src/app/shared/shared.module";

import { DetailPageComponent } from "./pages/detail-page/detail-page.component";
import { DetailComponent } from "./components/detail/detail.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { MatTableModule } from "@angular/material/table";



@NgModule({
  imports: [CommonModule, SharedModule, UsersRoutingModule, MatTableModule],
  providers: [],
  declarations: [
    UserListComponent,
    HomePageComponent,
    DetailPageComponent,
    UsersListComponent,
    DetailComponent,
  ],
})
export class UsersModule {}
