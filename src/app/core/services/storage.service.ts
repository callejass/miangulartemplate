import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {



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
      this.storage.removeItem(this.tokenKey);
    }    
  }



  constructor() { }
}
