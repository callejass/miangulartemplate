import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionService:SessionService) { }
/**
 * 
 * @param next 
 * @param state 
 * @returns 
 */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.sessionService.tokenActual
  
    if (this.sessionService.isLogged===true) {
      // Si existe un token, permitir la activación de la ruta
      console.log(token);
      console.log(this.sessionService.isLogged)
      return true;
    } else {
      // Si no existe un token, no permitir la activación de la ruta
      // Y redirigir al usuario a la página de inicio de sesión
      console.log(this.sessionService.isLogged)
      this.router.navigate(['/login']);
      return false;
    }
  }
}
