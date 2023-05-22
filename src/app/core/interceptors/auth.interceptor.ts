import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MiAuthService } from '../services/mi-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:MiAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken=this.authService.miGetToken();
    const authReq=request.clone({
      headers:request.headers.set('Authorization', 'bearer '+ authToken)
    })
    
    return next.handle(authReq);
  }
}
