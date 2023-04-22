import { Injectable } from '@angular/core';
import { UsersEndpointService } from './users-endpoint.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService implements UsersEndpointService{

  constructor() { }

  getAll(): Observable<any[]> {
    throw new Error('Method not implemented.');
  }
}
