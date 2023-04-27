import { Injectable } from '@angular/core';
import { UsersEndpointService } from './users-endpoint.service';
import {  Observable, of } from 'rxjs';
import { UsersModule } from '../users.module';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { USERS } from 'src/app/shared/mocks/users-mock';

@Injectable({
  providedIn: 'root'
})
export class UsersMockService implements UsersEndpointService{
UserList:User[]=USERS;
  constructor() { }
/**
 * Este metodo devuelve la lista de usuarios Mock
 * @returns {Observable<User[]>}
 */
  getAll(): Observable<User[]> {
    
    return of(this.UserList)

  }
  /**
   * Este método devuelve un usuario por su id.
   * Si no lo encuentra, devuelve null
   * @param id 
   * @returns Observable
   */
  get(id:string):Observable<User|null>{
    const user=this.UserList.find((user)=> user.id===id)
    
    return of(user||null)
      
    
  }
  delete(id:string):Observable<User[]>{
    this.UserList=this.UserList.filter((usuario)=>usuario.id !==id);
    return of(this.UserList)
  }
  update(user:User):Observable<User>{
    const index=this.UserList.findIndex((u)=>u.id===user.id);
    if (index!== -1){
      this.UserList[index]=user;
      console.log(index);
      console.log(user.id)
    }
    return of(user)
  }
  create(user:User):Observable<User>{
    this.UserList.push(user);
    return of(user)
  }
  }

