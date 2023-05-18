import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopiaInterService {
arrayPeticiones:HttpRequest<any>[]=[];
clear():void{
  console.log('borrando array peticiones');
  this.arrayPeticiones=[];

}
  constructor() { }
}
