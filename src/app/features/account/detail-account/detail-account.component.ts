import { Component, OnInit } from '@angular/core';
import { Provincia, Rol, User } from '../../users/models/user.model';
import { MiAuthService } from 'src/app/core/services/mi-auth.service';
import { TablasMaestrasService } from 'src/app/core/services/tablas-maestras.service';

@Component({
  selector: 'app-detail-account',
  templateUrl: './detail-account.component.html',
  styleUrls: ['./detail-account.component.css']
})
export class DetailAccountComponent implements OnInit {
  miUsuario: User|null=null;
  listaRoles: Rol[] = [];
listaProvincias: Provincia[] = [];
  constructor(private authService:MiAuthService,
    private tablasMaestras: TablasMaestrasService ) { }

  ngOnInit(): void {
    
    // this.miUsuario=this.authService.miGetUsuario()!;
    this.tablasMaestras.getData<Rol>('roles').subscribe((roles)=>{
      this.listaRoles=roles;
    });
    this.tablasMaestras.getData<Provincia>('provincias').subscribe((provincia)=>{
      this.listaProvincias=provincia
    })
  }
  getNombreProvincia(codigoProvincia: string | undefined): string {
    if (!codigoProvincia) {
      return "";
    }
  
    const provincia = this.listaProvincias.find(p => p.codigo === codigoProvincia);
    
    return provincia ? provincia.nombre : "";
  }
  
  getNombreRoles(codigosRoles: string[]|undefined): string[] {
    if (!codigosRoles){
      return []
    } else{
    return codigosRoles.map((codigo) => {
      const rol = this.listaRoles.find((r) => r.codigo === codigo);
      return rol ? rol.nombre : "";
    });}
  }

}
