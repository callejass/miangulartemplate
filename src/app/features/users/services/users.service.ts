import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsersEndpointService } from './users-endpoint.service';
import { User } from '../models/user.model';
import { GuiUtilsService } from 'src/app/core/services/gui-utils.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private endpoint: UsersEndpointService,
    private utilidades:GuiUtilsService) { }


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
  delete(id:string):Observable<{ok: boolean, message: string, data: any}>{
    return this.endpoint.delete(id).pipe(
      map(() => {
        return {ok: true, message: 'Hola', data:null}
      })
    )
  }
  update(user:User):Observable<User>{
    console.log('Actualizando usuario:' , user)
    return this.endpoint.update(user);
  }
  create(user:User):Observable<User>{
    return this.endpoint.create(user)
  }
}
