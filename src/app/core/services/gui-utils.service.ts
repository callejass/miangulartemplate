import { Optional } from "@angular/core";
/* eslint-disable @typescript-eslint/no-unused-vars */

//import { NbDialogConfig, NbDialogService } from '@nebular/theme';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Inject, Injectable } from "@angular/core";
import { filter, map, Observable, of } from "rxjs";
import { format } from "date-fns";

import { HttpErrorResponse } from "@angular/common/http";
import { MiDialogoComponent } from "src/app/shared/mi-dialogo/mi-dialogo.component";
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class GuiUtilsService {
  constructor(
    private snackBar: MatSnackBar,
    @Optional()
    private ds: MatDialog
  ) {}

  public mostrarSnackbar(
    message: string,
    action: string | undefined=undefined,
    duration: number=3000,
    horizontalPosition: MatSnackBarHorizontalPosition = "right",
    verticalPosition:MatSnackBarVerticalPosition='top',
    panelClass: string | string[] = 'my-custom-snackbar'
  ): void {
    
    this.snackBar.open(
      message,action,{
        duration:duration,
        horizontalPosition:horizontalPosition,
        verticalPosition:verticalPosition,
        panelClass: panelClass
      }
      
      
    );
  }

  public debug(objetos: any[]): void {
    const opciones: MatDialogConfig = {
      data: objetos,
    };
    // this.ds.open(DebugObjectComponent, opciones);
  }

  public askText$(titulo?: string, subtitulo?: string): Observable<string> {
    const opciones: MatDialogConfig = {
      data: {
        titulo: titulo ?? "Texto",
        subtitulo: subtitulo ?? "Introduzca un valor",
      },
    };
    return of("tururú");
    // const ref = this.ds.open(InputTextPopupComponent, opciones);
    // return ref.afterClosed().pipe(
    //   filter((r) => !!r),
    //   map((r) => r)
    // );
  }

  /**
 * Método `confirm$` para abrir un diálogo modal y obtener una confirmación del usuario.
 *
 * @param {string} pregunta - La pregunta que se muestra en el diálogo de confirmación.
 *
 * @returns {Observable<boolean>} - Un Observable que emite un valor booleano una vez
 *                                  que el diálogo se cierra. El valor booleano es el
 *                                  resultado de la confirmación del usuario.
 *
 * La función configura y abre un diálogo modal a través del servicio `MatDialog`. El
 * diálogo es del tipo `MiDialogoComponent` y se le pasa un objeto de configuración
 * que incluye la pregunta que se muestra en el diálogo.
 *
 * La función devuelve un Observable que emite el resultado de la confirmación del usuario
 * (un valor booleano) cuando el diálogo se cierra.
 */
  public confirm$(pregunta: string): Observable<boolean> {
    const opciones: MatDialogConfig = {
      data: { titulo: pregunta, mensaje: null, submensaje: null },
    };

    const ref = this.ds.open(MiDialogoComponent, opciones);

    return ref.afterClosed().pipe(map((r) => r));
  }

  public showErrors(errors: string[], timeout?: number): Observable<boolean> {
    const pMensaje = (
      errors ?? ["Se ha producido un error pero no hay más información"]
    ).join(" - ");
    return this.showError(pMensaje, timeout);
  }
  /** Método para emitir un mensaje de error
   * @param mensaje Mensaje de error
   */
  public showError(
    error: string | Error,
    timeout?: number
  ): Observable<boolean> {
    const pMensaje =
      error instanceof Error ? `${error.message}-${error.stack}` : error;
    // return this.notifier.error(pMensaje, timeout);
    return of(true);
  }

  /** Método para emitir un mensaje de éxito
   * @param mensaje Mensaje de éxito
   */
  public showSuccess(mensaje: string, timeout?: number): Observable<boolean> {
    this.throwMessage(mensaje, "success");
    console.log(mensaje);
    return of(true);
    // return this.notifier.success(mensaje, timeout);
  }
  /**
   * Método para mostrar un mensaje informativo
   * @param mensaje Mensaje informativo
   */
  public showInfo(mensaje: string, timeout?: number): Observable<boolean> {
    this.throwMessage(mensaje, "info");
    return of(true);
    // return this.notifier.info(mensaje, timeout);
  }

  public showDebug(mensaje: string, timeout?: number): Observable<boolean> {
    this.throwMessage(mensaje, "debug");
    return of(true);
    //return this.notifier.debug(mensaje, timeout);
  }

  /**
   * Método para mostrar un mensaje de warning
   * @param mensaje Mensaje de warning
   */
  public showWarning(mensaje: string, timeout?: number): Observable<boolean> {
    this.throwMessage(mensaje, "warning");
    return of(true);
    // return this.notifier.warning(mensaje, timeout);
  }

  public showHttpError(
    error: HttpErrorResponse,
    timeout?: number
  ): Observable<boolean> {
    const pMensaje = `${error.message}`;
    return of(true);
    //return this.notifier.debug(pMensaje, timeout);
  }

  /**
   * Método interno que lanza el mensaje
   * @param mensaje Mensaje a mostrar
   * @param tipo Tipo del mensaje (error, warning, success o info)
   */
  private throwMessage(mensaje: string, tipo: string): void {}
}
