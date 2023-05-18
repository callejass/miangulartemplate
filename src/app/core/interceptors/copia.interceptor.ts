import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CopiaInterService } from '../services/copia.inter.service';

@Injectable()
export class CopiaInterceptor implements HttpInterceptor {

  constructor(private copiaInterService:CopiaInterService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.copiaInterService.guardarPeticion(request.clone());
    
    return next.handle(request);
  }
}
