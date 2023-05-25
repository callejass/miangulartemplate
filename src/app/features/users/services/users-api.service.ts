import { Injectable } from "@angular/core";
import { UsersEndpointService } from "./users-endpoint.service";
import { Observable, map, of } from "rxjs";
import { UsersModule } from "../users.module";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: UsersModule,
})
export class UsersApiService implements UsersEndpointService {
  constructor(private http: HttpClient) {}
  delete(id: string): Observable<any[]> {
    const url=`http://localhost:3000/users/${id}`;
    return this.http.delete(url).pipe(
      map((respuesta:any)=>{
        console.log(respuesta);
        return respuesta.user
      })
    )
    
  }
  update(user: User): Observable<any> {
    const url=`http://localhost:3000/users/${user.id}`;
    return this.http.put(url,user).pipe(
      map((respuesta:any)=>{
        console.log(respuesta);
        return respuesta.user
      })
    )
  }
  create(user: User): Observable<any> {
    const url = "http://localhost:3000/users";

    return this.http
      .post(url, user)
      .pipe(
        map((respuesta:any) => {
          
          return respuesta.user;
        })
      )
      
    
  }

  getAll(): Observable<User[]> {
    const url="http://localhost:3000/users";
    return this.http.get(url).pipe(
      map((respuesta:any)=>{
        console.log(respuesta);
        return respuesta.users;
      })
    )
  }
  get(id: string): Observable<any> {
    const url=`http://localhost:3000/users/${id}`;
    return this.http.get(url).pipe(
      map((respuesta:any)=>{
        console.log(respuesta);
        return respuesta.user
      })
    )
  }
}
