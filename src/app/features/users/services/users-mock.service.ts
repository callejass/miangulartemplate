import { Injectable } from '@angular/core';
import { UsersEndpointService } from './users-endpoint.service';
import {  Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { USERS } from 'src/app/shared/mocks/users-mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersMockService implements UsersEndpointService{
UserList:User[]=USERS;
  constructor(private http:HttpClient){}

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
    console.log('Actualizando usuario en mockSErvice');
    const index=this.UserList.findIndex((u)=>u.id===user.id);
    if (index!== -1){
      this.UserList[index]=user;
      console.log('Usuario actualizado<.', this.UserList[index]);
      console.log(user.id)
    } else{
      console.log('No se encontró el usuario para actualizar'); 
    }
    return of(user)
  }
  create(user:User):Observable<User>{
    this.UserList.push(user);
    return of(user)
  }

  
  }

