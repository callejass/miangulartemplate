import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersEndpointService } from './users-endpoint.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private endpoint: UsersEndpointService) { }


  /**
   * Este método devuelve la lista de usuarios
   */
  getAll(): Observable<User[]>{
    return this.endpoint.getAll();
  }
  /**
   * Este método devuelve un usuario
   * @param id 
   * @returns 
   */
  get(id: string): Observable<User>{
    
    return this.endpoint.get(id);
  }
  delete(id:string):Observable<User[]>{
    return this.endpoint.delete(id)
  }
  update(user:User):Observable<User>{
    return this.endpoint.update(user);
  }
  create(user:User):Observable<User>{
    return this.endpoint.create(user)
  }
}
