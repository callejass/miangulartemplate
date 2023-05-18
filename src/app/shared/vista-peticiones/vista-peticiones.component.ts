import { HttpRequest } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CopiaInterService } from "src/app/core/services/copia.inter.service";

@Component({
  selector: "app-vista-peticiones",
  templateUrl: "./vista-peticiones.component.html",
  styleUrls: ["./vista-peticiones.component.css"],
})
export class VistaPeticionesComponent implements OnInit {
  misPeticiones!: HttpRequest<any>[];
  misPeticiones$!:Observable<HttpRequest<any>[]>
  constructor(private copiaInter: CopiaInterService) {
    
  }
  ngOnInit(): void {
    this.misPeticiones$=this.copiaInter.peticiones$;
    this.copiaInter.peticiones$.subscribe((peticiones: HttpRequest<any>[]) => {
      this.misPeticiones = peticiones;
      console.log('Peticiones almacenadas: ', this.misPeticiones);
    });
    console.log('iniciando componente');
  }

  clear(): void {
    console.log('boton presionado');
    this.copiaInter.clear();
  }
}
