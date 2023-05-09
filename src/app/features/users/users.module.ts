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
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { CustomDateAdapter } from './adaptadorFechapersonalizado';

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMM YYYY',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    MatTableModule
  ],
  providers:[
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }


  ],
  declarations: [UserListComponent, HomePageComponent, DetailPageComponent, UsersListComponent,DetailComponent],
  

  
})
export class UsersModule { }
