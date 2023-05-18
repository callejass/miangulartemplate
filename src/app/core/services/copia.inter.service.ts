import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CopiaInterService {
  /**
 * peticionesSubject es un observable ReplaySubject que emitirá la última lista de 
 * peticiones HTTP (o más recientes) a cualquier nuevo suscriptor, 
 * independientemente de cuándo se suscriban. Se usa aqui este tipo especial porque
 *  al cambiar de modulo, Angular desmonta los componenetes que están en la ruta activa, por
 * lo que 'vistapeticiones' se crea de nuevo. Usando ReplaySubject, consigo guardar el ultimo 
 * valor emitido.
 * 
 *
 * ReplaySubject es una variante de Subject (un tipo especial de Observable), 
 * que "reproduce" los valores emitidos a los nuevos suscriptores. 
 * En este caso, siempre emitirá la última lista de peticiones HTTP.
 * 
 *Establecemos peticionesSubject como privado para encapsularlo dentro de la clase
  y proteger su estado interno. Esto es para asegurar que no se pueda acceder o 
  modificar directamente desde fuera de la clase.

 
 * 
 */
  private peticionesSubject = new ReplaySubject<HttpRequest<any>[]>();

  public peticiones$: Observable<HttpRequest<any>[]>;

  //  HttpRequest<any>[] es un array que representa las peticiones HTTP.
  private arrayPeticiones: HttpRequest<any>[] = [];

  /**
* Asignamos en el constructor a `peticiones$` el Observable que se deriva de `peticionesSubject`.
* `.asObservable()` se usa para ocultar la identidad de `peticionesSubject` y 
*  exponerlo solo como un Observable. Esto previene que los usuarios de `peticiones$`
*  invadan y modifiquen directamente el Subject, garantizando que sólo los datos
* sean emitidos a través de la lógica definida en nuestro servicio.

 */
  constructor() {
    this.peticiones$ = this.peticionesSubject.asObservable();
  }

  /**
   * Método `guardarPeticion` recibe una petición HTTP como argumento.
   *
   * @param {HttpRequest<any>} peticion - La petición HTTP a guardar.
   *
   * Este método realiza dos acciones:
   * 1. Añade la petición al array `this.arrayPeticiones` utilizando el método `push()`.
   *    El método `push()` de JavaScript añade uno o más elementos al final del array.
   * 2. Emite la última versión del array `this.arrayPeticiones` a través del método `next()`
   *    del Subject `this.peticionesSubject`. El método `next()` de RxJS se utiliza para emitir
   *    un nuevo valor en el flujo de datos.
   *
   * Por lo tanto, este método se utiliza para almacenar las peticiones HTTP y actualizar
   * el flujo de datos del Subject `this.peticionesSubject` para que todos los Observers
   * (los componentes o servicios que se suscriben a este Subject) reciban la lista más reciente
   * de peticiones HTTP.
   */
  guardarPeticion(peticion: HttpRequest<any>): void {
    this.arrayPeticiones.push(peticion);
    this.peticionesSubject.next(this.arrayPeticiones);
  }

  /**
   * Método `clear` para borrar todas las peticiones HTTP almacenadas.
   *
   * Este método realiza dos acciones:
   * 1. Reinicia el array `this.arrayPeticiones` asignándole un array vacío. Esto tiene como
   *    resultado la eliminación de todas las peticiones HTTP previamente almacenadas.
   * 2. Emite la versión vacía del array `this.arrayPeticiones` a través del método `next()`
   *    del Subject `this.peticionesSubject`. El método `next()` de RxJS se utiliza para emitir
   *    un nuevo valor en el flujo de datos.
   *
   * Por lo tanto, este método se utiliza para borrar todas las peticiones HTTP almacenadas
   * y notificar a todos los Observers (los componentes o servicios que se suscriben a este
   * Subject) sobre la actualización, proporcionándoles una lista vacía de peticiones HTTP.
   */

  clear(): Observable<{ ok: boolean }> {
    try {
      this.arrayPeticiones = [];
      this.peticionesSubject.next(this.arrayPeticiones);
      return of({ ok: true });
    } catch (error) {
      console.error("Hubo un problema al limpiar las peticiones:", error);
      return throwError({ ok: false, error: error });
    }
  }
}
