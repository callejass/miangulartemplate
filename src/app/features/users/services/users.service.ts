import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UsersEndpointService } from './users-endpoint.service';
import { User } from '../models/user.model';
import { GuiUtilsService } from 'src/app/core/services/gui-utils.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  /**LLama al endpointService para conseguir la lista de usuarios, se suscribe 
   * y busca en el array si hay algun usuario con el mismo id. 
   * 
   * Si no lo encuentra, retorna un observable con el valor 'true', lo 
   * que indica que el Id es único.
   * 
   * @param id el id será el valor control.value del formulario
   * @returns 
   */
  idUnico(id:string):Observable<boolean>{
    return this.endpoint.getAll().pipe(
      map((usuarios: User[]) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === id);
        return !usuarioEncontrado; // Retorna 'true' si el ID es único, 'false' si no lo es
      })
    );
    
  }

  constructor(private endpoint: UsersEndpointService,
    private utilidades:GuiUtilsService) { }


  /**
   * Este método devuelve la lista de usuarios
   */
  getAll(): Observable<User[]>{
    return this.endpoint.getAll();
    
  }
  /**
   * Este método devuelve un usuario
   * @param id 
   * @returns 
   */
  get(id: string): Observable<User>{
    
    return this.endpoint.get(id);
  }
  delete(id: string): Observable<{ok: boolean, message: string, data: User[] | null}> {
    return this.endpoint.delete(id).pipe(
      map((usersList: User[]) => {
        return {
          ok: true,
          message: 'Usuario eliminado con éxito',
          data: usersList
        };
      }),
      catchError((error: any) => {
        console.error(error);
        return of({ok: false, message: 'Hubo un error al eliminar el usuario', data: null});
      })
    );
}


  update(user:User):Observable<{ok:boolean, mensaje:string, data:User| null}>{
    return this.endpoint.update(user).pipe(
      map((data:User)=>{
        return{
          ok:true,
          mensaje:'Usuario editado con éxito',
          data:data
        };
        
      }),
      catchError((error:any)=>{
        return of({ok: false, mensaje: 'Hubo un error al actualizar el usuario', data: null})
      })
    )



  }
    
  create(user:User):Observable<{ok:boolean, mensaje:string, data:User| null}>{
    return this.endpoint.create(user).pipe(
      map((data:User)=>{
        return{
          ok:true,
          mensaje:'Usuario creado con éxito',
          data:data
        };
        
      }),
      catchError((error:any)=>{
        return of({ok: false, mensaje: 'Hubo un error crear el usuario', data: null})
      })
    )

      

  }
    
  
  
}
