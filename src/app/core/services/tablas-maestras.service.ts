import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, catchError, of } from "rxjs";
import { Provincia, Rol } from "src/app/features/users/models/user.model";



export type TABLA='provincias'| 'roles'|'comunidades';

@Injectable({
  providedIn: "root",
})
export class TablasMaestrasService {
  private readonly rutaBase='assets/data/mocks'
  constructor(private http:HttpClient) {}


  /**
 * Obtiene los datos de un archivo JSON con el nombre de la tabla especificada.
 * @template T El tipo de dato de los elementos de la tabla.
 * @param tabla El nombre de la tabla.
 * @returns Un observable que emite un array de objetos del tipo T.
 */

  getData<T>(tabla:TABLA):Observable<T[]>{
const jsonFile=`${this.rutaBase}/${tabla}.jason`
    return this.http.get<T[]>(`${this.rutaBase}/${tabla}.json`).pipe(
      catchError((error)=>{
        console.error('error al leer el archivo ',error);
      return of([])
      })
    )
  }

}
