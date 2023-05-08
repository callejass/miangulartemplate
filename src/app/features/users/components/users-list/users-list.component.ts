import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Rol,Provincia ,User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { MiDialogoComponent } from 'src/app/shared/mi-dialogo/mi-dialogo.component';
import { GuiUtilsService } from 'src/app/core/services/gui-utils.service';
import { filter, switchMap, tap } from 'rxjs';
import { TablasMaestrasService } from 'src/app/core/services/tablas-maestras.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  displayedColumns:string[]=['id', 'nombre','email', 'roles', 'acciones'];
  usersList: User[] = [];
  listaRoles:Rol[]=[];
  listaProvincias:Provincia[]=[]
  constructor(
    private gui: GuiUtilsService,
    private usersService: UsersService, private dialogo:MatDialog,
    private tablasMaestras:TablasMaestrasService
    ) {}
  ngOnInit(): void {
    this.getLista();
    this.tablasMaestras.getData<Rol>('roles').subscribe((roles)=>{
      this.listaRoles=roles;
      console.log(this.listaRoles)
    });
    this.tablasMaestras.getData<Provincia>('provincias').subscribe((provincia)=>{
      this.listaProvincias=provincia;
      console.log(this.listaProvincias)
    })
  }
  
  getNombreRoles(codigosRoles: string[]): string[] {
    return codigosRoles.map(codigo => {
      const rol = this.listaRoles.find(r => r.codigo === codigo);
      return rol ? rol.nombre : "";
    });
  }
  
  
  getLista(): void {
    this.usersService.getAll().subscribe({
      next: (users: User[]) => {
        this.usersList = users;
        console.log(this.usersList)
      },
    });
  };
  /**
   * 
   * @param id 
   */
delete(id:string):void{
  

  this.gui.confirm$('¿Seguro que quiere borrar el usuario?').pipe(
    filter(si => si),
    switchMap(() => this.usersService.delete(id)),
    filter((r: any) => {
      if(!r.ok){
        this.gui.showError(r.message);
      }
      return r.ok;
    }),
    tap(() => this.gui.showSuccess('El usuario se ha borrado correctamente')),
    switchMap(() => this.usersService.getAll())
  ).subscribe((usuarios: User[]) => {
    this.usersList = usuarios;
  })

  // const dialogRef = this.dialogo.open(MiDialogoComponent, {
  //   panelClass:'mi-dialogo-personalizado',
  //   data: {
  //     titulo: `Eliminar el usuario ${id}`,
  //     mensaje:'¿Estás seguro?',
  //     submensaje:'Esto es una prueba'
  //   }
  // });
  // dialogRef.afterClosed().subscribe(result => {
  //   if (result) {
      
  //     this.usersService.delete(id).subscribe((usuarios)=>{
  //       this.usersList=usuarios
  //     })
  //   }
  // });




  
}

}
