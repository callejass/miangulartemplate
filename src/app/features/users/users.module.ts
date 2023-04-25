import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { UsersService } from './services/users.service';
import { UsersEndpointService } from './services/users-endpoint.service';
import { UsersMockService } from './services/users-mock.service';
import { DetailComponent } from './components/detail/detail.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserListComponent, HomePageComponent, DetailPageComponent, UsersListComponent,DetailComponent],
  

  
})
export class UsersModule { }
