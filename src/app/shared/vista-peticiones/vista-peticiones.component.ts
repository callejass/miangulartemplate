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

  constructor(private copiaInterService: CopiaInterService) {}
  ngOnInit(): void {
    this.copiaInterService.peticiones$.subscribe(
      (peticiones: HttpRequest<any>[]) => {
        this.misPeticiones = peticiones;
      }
    );
  }

  clear(): void {
    this.copiaInterService.clear();
  }
}
