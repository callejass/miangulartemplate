import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { MiDialogoComponent } from 'src/app/shared/mi-dialogo/mi-dialogo.component';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  usersList: User[] = [];
  constructor(private usersService: UsersService, private dialogo:MatDialog ) {}
  ngOnInit(): void {
    this.getLista();
  }
  
  getLista(): void {
    this.usersService.getAll().subscribe({
      next: (users: User[]) => {
        this.usersList = users;
      },
    });
  };
  /**
   * 
   * @param id 
   */
delete(id:string):void{
  
  const dialogRef = this.dialogo.open(MiDialogoComponent, {
    panelClass:'mi-dialogo-personalizado',
    data: {
      titulo: `Eliminar el usuario ${id}`,
      mensaje:'¿Estás seguro?',
      submensaje:'Esto es una prueba'
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
      this.usersService.delete(id).subscribe((usuarios)=>{
        this.usersList=usuarios
      })
    }
  });




  
}

}
