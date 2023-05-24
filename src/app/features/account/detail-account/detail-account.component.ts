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
  miUsuario!: User|null;
  listaRoles: Rol[] = [];
listaProvincias: Provincia[] = [];
  constructor(private authService:MiAuthService,
    private tablasMaestras: TablasMaestrasService ) { }

  ngOnInit(): void {
    this.miUsuario=this.authService.miGetUsuario();
    
  }
  getNombreRoles(codigosRoles: string[]): string[] {
    return codigosRoles.map((codigo) => {
      const rol = this.listaRoles.find((r) => r.codigo === codigo);
      return rol ? rol.nombre : "";
    });
  }

}
