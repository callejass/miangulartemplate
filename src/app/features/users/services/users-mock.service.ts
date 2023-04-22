import { Injectable } from '@angular/core';
import { UsersEndpointService } from './users-endpoint.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersMockService implements UsersEndpointService{

  constructor() { }

  getAll(): Observable<any[]> {
    
    return of([{
      id: '1',
      nombre: 'Sergio'
    }]);

  }
}
