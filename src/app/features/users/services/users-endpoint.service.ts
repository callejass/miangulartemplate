import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Clase abstracta que define la interfaz de un servicio de usuarios.
 *
 * Esta clase se utiliza para crear servicios de usuarios que se pueden intercambiar fácilmente
 * en la aplicación mediante la inyección de dependencias y useClass. Proporciona una base común
 * para las operaciones de usuario, como obtener todos los usuarios, obtener un usuario específico,
 * crear, actualizar y eliminar usuarios.
 *
 * Las implementaciones concretas de esta clase deben proporcionar su propia lógica para
 * interactuar con una API, base de datos u otro tipo de almacenamiento de datos.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class UsersEndpointService {

  constructor() { }

/**
 * Obtiene todos los elementos de una colección.
 * Devuelve un observable que contiene un array
 * @returns {observable<any[]>} 
 */
  abstract getAll(): Observable<any[]>;
  abstract get(id:string):Observable<any>;
  abstract delete(id:string):Observable<any[]>;
  abstract update(user:User):Observable<any>
  abstract create(user:User):Observable<any>;
}
