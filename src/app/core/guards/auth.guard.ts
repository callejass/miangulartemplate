import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate():boolean{
    const token=sessionStorage.getItem('token');
    console.log(token);
    if (token){
      this.router.navigate(['/dashboard']);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false
    }

  }
    
  
}
