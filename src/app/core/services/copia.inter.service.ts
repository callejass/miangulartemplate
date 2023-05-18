import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CopiaInterService {
  private peticionesSubject=new ReplaySubject<HttpRequest<any>[]>();
  public peticiones$:Observable<HttpRequest<any>[]>;
  private arrayPeticiones:HttpRequest<any>[]=[];

  constructor() {
    this.peticiones$ = this.peticionesSubject.asObservable();
   }

  
  guardarPeticion(peticion:HttpRequest<any>){
 this.arrayPeticiones.push(peticion);
 this.peticionesSubject.next(this.arrayPeticiones);
 console.log('probando cmo va el guardado');
 this.arrayPeticiones.forEach((peticion) => {
  console.log(peticion.url);
});


  }

clear():void{
  console.log('borrando array peticiones');
  this.arrayPeticiones=[];
  this.peticionesSubject.next(this.arrayPeticiones);

}
}
