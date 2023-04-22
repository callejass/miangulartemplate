import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersEndpointService } from './users-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private endpoint: UsersEndpointService) { }


  /**
   * Este método devuelve la lista de usuarios
   */
  getAll(): Observable<any[]>{
    return this.endpoint.getAll();
  }

  get(id: string): Observable<any>{
    throw new Error('No implementado todavía');
  }


}
