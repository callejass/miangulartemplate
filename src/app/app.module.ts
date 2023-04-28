import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './app-routing.module';
import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';
import { UsersService } from './features/users/services/users.service';
import { UsersEndpointService } from './features/users/services/users-endpoint.service';
import { UsersMockService } from './features/users/services/users-mock.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    CoreModule,
    SharedModule,
    CustomMaterialModule.forRoot(),
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `http://my-api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel
    })
  ],
  providers:[UsersService,{provide:UsersEndpointService, useClass:UsersMockService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
