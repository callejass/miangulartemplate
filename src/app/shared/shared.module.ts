import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './content-placeholder-animation/content-placeholder-animation.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { LayoutComponent } from './layout/layout.component';
import { MiDialogoComponent } from './mi-dialogo/mi-dialogo.component';
import { MiSnackbarComponent } from './mi-snackbar/mi-snackbar.component';
import { VistaPeticionesComponent } from './vista-peticiones/vista-peticiones.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { OnlyDevelopmentDirective } from './directivas/only-development.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        CustomMaterialModule,
        FlexLayoutModule,
    ],
    declarations: [
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LimitToPipe,
        LocalDatePipe,
        YesNoPipe,
        LayoutComponent,
        MiDialogoComponent,
        MiSnackbarComponent,
        VistaPeticionesComponent,
        SpinnerComponent,
        CabeceraComponent,
        OnlyDevelopmentDirective,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CustomMaterialModule,
        LimitToPipe,
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LocalDatePipe,
        YesNoPipe,
        CabeceraComponent,
        OnlyDevelopmentDirective,
    ]
})
export class SharedModule { }
