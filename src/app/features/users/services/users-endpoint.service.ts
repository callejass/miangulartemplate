import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class UsersEndpointService {

  constructor() { }


  abstract getAll(): Observable<any[]>;
  abstract get(id:string):Observable<any>;

}
