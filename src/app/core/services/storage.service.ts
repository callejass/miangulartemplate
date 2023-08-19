import { Injectable } from '@angular/core';
import { miApplicationUser } from 'src/app/features/users/models/aplication.users';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

//************************De Sergio.*******************************
  private get storage(){
    return localStorage;
  }

  private readonly tokenKey: string = 'token';
  get token(): string | null{
    return this.storage.getItem(this.tokenKey);
  }

  set token(value: string | null){
    if(!!value){
      this.storage.setItem(this.tokenKey,value);
    } else {
      //Esto elimina completamente el token, hace que si el valor del token es null, se elimine completamente,
      //en lugar de dejar la llave token igual a null
      this.storage.removeItem(this.tokenKey);
    }    
  }

//******************************************************************** */

private readonly userKey:string='currentUser';
get currentUser():miApplicationUser |null{
  const userString=this.storage.getItem(this.userKey);

  return userString? JSON.parse(userString):null
}
set currentUser(value:miApplicationUser|null){
  if (value){
    this.storage.setItem(this.userKey,JSON.stringify(value))
  } else {
    this.storage.removeItem(this.userKey)
  }
}

}
