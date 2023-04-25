import { Injectable } from "@angular/core";
import { UsersEndpointService } from "./users-endpoint.service";
import { Observable } from "rxjs";
import { UsersModule } from "../users.module";

@Injectable({
  providedIn: UsersModule,
})
export class UsersApiService implements UsersEndpointService {
  constructor() {}

  getAll(): Observable<any[]> {
    throw new Error("Method not implemented.");
  }
  get(id:string): Observable<any> {
    throw new Error("Metodo no implementado.");
  }
}
