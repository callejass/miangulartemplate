import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';

import { PageAccountComponent } from './page-account/page-account.component';
import { DetailAccountComponent } from './detail-account/detail-account.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
 
    PageAccountComponent,
    DetailAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    
    SharedModule
  ]
})
export class AccountModule { }
