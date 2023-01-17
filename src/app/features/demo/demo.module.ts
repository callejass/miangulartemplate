import { SharedModule } from 'src/app/shared/shared.module';
import { DemoRoutingModule } from './demo-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePageComponent } from './pages/theme-page/theme-page.component';
import { ListadoComponent } from './components/listado/listado.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    ThemePageComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DemoModule { }
