import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { Rol, Provincia, User } from "../../models/user.model";
import { MatDialog } from "@angular/material/dialog";
import { GuiUtilsService } from "src/app/core/services/gui-utils.service";
import { filter, switchMap, tap } from "rxjs";
import { TablasMaestrasService } from "src/app/core/services/tablas-maestras.service";
@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ["id", "nombre", "email", "roles", "acciones"];
  usersList: User[] = [];
  listaRoles: Rol[] = [];
  listaProvincias: Provincia[] = [];
  constructor(
    private gui: GuiUtilsService,
    private usersService: UsersService,
    private dialogo: MatDialog,
    private tablasMaestras: TablasMaestrasService
  ) {}
  ngOnInit(): void {
    this.getLista();
    this.tablasMaestras.getData<Rol>("roles").subscribe((roles) => {
      this.listaRoles = roles;
      
    });
    this.tablasMaestras
      .getData<Provincia>("provincias")
      .subscribe((provincia) => {
        this.listaProvincias = provincia;
       
      });
  }

  getNombreRoles(codigosRoles: string[]): string[] {
    return codigosRoles.map((codigo) => {
      const rol = this.listaRoles.find((r) => r.codigo === codigo);
      return rol ? rol.nombre : "";
    });
  }
/**
 * Obtiene la lista de usuarios desde el servicio y asigna los datos al arreglo 'usersList'.
 
 */
  getLista(): void {
    this.usersService.getAll().subscribe({
      next: (users: User[]) => {
        this.usersList = users;
        
      },
    });
  }
  /**
 * Elimina un usuario dado su id. 
 * 
 * Primero, se muestra un mensaje de confirmación. Si el usuario confirma la operación,
 * se procede a intentar eliminar el usuario mediante el método `delete` del `usersService`.
 * 
 * Si la operación de eliminación es exitosa (es decir, si la respuesta tiene `ok` como verdadero),
 * se muestra un mensaje de éxito y se actualiza `this.usersList` con la lista de usuarios actualizada
 * que se recibe en `data`.
 * 
 * Si la operación de eliminación no es exitosa (es decir, si la respuesta tiene `ok` como falso),
 * se muestra el mensaje de error que se recibe en la respuesta.
 * 
 * @param id - El id del usuario a eliminar
 */
  delete(id: string): void {
    this.gui
      .confirm$("¿Seguro que quiere borrar el usuario?")
      .pipe(
        filter((si) => si),
        switchMap(() => this.usersService.delete(id)),
        filter((r: any) => {
          if (!r.ok) {
            this.gui.showError(r.message);
          }
          return r.ok;
        }),
        tap((r:{ok:boolean,message:string, data:any}) =>
          this.gui.mostrarSnackbar(
           `${r.message}` 
          )
        )
        
      )
      .subscribe((r: { ok: boolean; message: string; data: any }) => {
        if (r.ok) {
          this.usersList = r.data;
        }
      });

    
  }
}
