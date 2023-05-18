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

  
/**
 * Este método intercepta las solicitudes HTTP, las clona y las guarda en copiaInterService.
 *
 * @param request: La solicitud HTTP que será interceptada.
 * @param next: Es el siguiente interceptor en la cadena de interceptores. 
 *              Representa el siguiente manejador en la cadena de manejo de 
 *              la petición HTTP.
 *
 * @returns Observable<HttpEvent<unknown>>: Devuelve un observable de la 
 *              petición HTTP manipulada por el siguiente interceptor de la cadena. 
 *              Esto permite que los interceptores posteriores manejen la petición.
 */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.copiaInterService.guardarPeticion(request.clone());
    
    return next.handle(request);
  }
}
