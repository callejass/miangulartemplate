import { Injectable } from '@angular/core';
import { UsersEndpointService } from './users-endpoint.service';
import { Observable } from 'rxjs';
import { UsersModule } from '../users.module';
import { User } from '../models/user.model';

@Injectable({
  providedIn: UsersModule,
})
export class UsersApiService implements UsersEndpointService {
  constructor() {}
   delete(id: string): Observable<any[]> {
    throw new Error('Method not implemented.');
  }
 update(user: User): Observable<any> {
    throw new Error('Method not implemented.');
  }
   create(user: User): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getAll(): Observable<any[]> {
    throw new Error('Method not implemented.');
  }
  get(id:string): Observable<any> {
    throw new Error('Metodo no implementado.');
  }
}
