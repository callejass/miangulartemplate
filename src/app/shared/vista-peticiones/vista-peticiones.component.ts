import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CopiaInterService } from 'src/app/core/services/copia.inter.service';

@Component({
  selector: 'app-vista-peticiones',
  templateUrl: './vista-peticiones.component.html',
  styleUrls: ['./vista-peticiones.component.css']
})
export class VistaPeticionesComponent implements OnInit {
misPeticiones:HttpRequest<any>[]=[]
  constructor(private copiaInter:CopiaInterService) { }

  ngOnInit(): void {
    this.misPeticiones=this.copiaInter.arrayPeticiones;
  }
clear():void{
   console.log('boton presionado');
  this.copiaInter.clear();

}
}
