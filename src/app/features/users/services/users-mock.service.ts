import { Injectable } from '@angular/core';
import { UsersEndpointService } from './users-endpoint.service';
import { Observable, of } from 'rxjs';
import { UsersModule } from '../users.module';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { USERS } from 'src/app/shared/mocks/users-mock';

@Injectable({
  providedIn: 'root'
})
export class UsersMockService implements UsersEndpointService{
UserList:User[]=USERS
  constructor(private http:HttpClient) { }
/**
 * Este metodo devuelve la lista de usuarios Mock
 * @returns 
 */
  getAll(): Observable<User[]> {
    
    return of(this.UserList)

  }
  /**
   * Este método devuelve un usuario según su id
   * Si no lo encuentra, devuelve null
   * @param id 
   * @returns 
   */
  get(id:string):Observable<User|null>{
    const user=this.UserList.find((user)=> user.id===id)
    
    return of(user||null)
      
    
  }
}
