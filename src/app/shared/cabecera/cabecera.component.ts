import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent  {

  constructor() { }
  @Input()
  titulo!: string;
  @Input()
  boton1!: string;
  @Input()
  boton2!: string;
  @Input()
  boton3!: string;
  @Output() botonClicked = new EventEmitter<number>();

  onClickBoton(boton: number) {
    this.botonClicked.emit(boton);
  }
  
}
