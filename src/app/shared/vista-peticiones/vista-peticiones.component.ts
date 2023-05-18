import { HttpRequest } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable, filter, switchMap, tap } from "rxjs";
import { CopiaInterService } from "src/app/core/services/copia.inter.service";
import { GuiUtilsService } from "src/app/core/services/gui-utils.service";

@Component({
  selector: "app-vista-peticiones",
  templateUrl: "./vista-peticiones.component.html",
  styleUrls: ["./vista-peticiones.component.css"],
})
export class VistaPeticionesComponent implements OnInit {
  misPeticiones!: HttpRequest<any>[];

  constructor(
    private copiaInterService: CopiaInterService,
    private gui: GuiUtilsService
  ) {}
  ngOnInit(): void {
    this.copiaInterService.peticiones$.subscribe(
      (peticiones: HttpRequest<any>[]) => {
        this.misPeticiones = peticiones;
      }
    );
  }
/**
 * 
 */
  clear(): void {
    this.gui.confirm$("Desea borrar las peticiones?").pipe(
      filter((si)=>si),
      switchMap(()=>this.copiaInterService.clear())
    ).subscribe({

      next:(r)=>{
      if (r.ok){
        this.gui.mostrarSnackbar('Las peticiones han sido borradas');
      } 
    
  },
  error:(e)=>this.gui.mostrarSnackbar('hubo un error al borrar'),
  // complete:()=>
  complete:()=>console.info('operacion completada')

})
   } }