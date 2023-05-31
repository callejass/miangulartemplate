import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionSErvice:SessionService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.sessionSErvice.tokenActual
  
    if (token) {
      // Si existe un token, permitir la activación de la ruta
      console.log(token)
      return true;
    } else {
      // Si no existe un token, no permitir la activación de la ruta
      // Y redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
