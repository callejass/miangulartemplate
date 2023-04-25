import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { User } from "../../models/user.model";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
})
export class UsersListComponent implements OnInit{
  usersList: User[] = [];
  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    
    this.usersService.getAll().subscribe({
      next:(users:User[])=>{
        this.usersList=users;
      }
    }
    
    );
  }
  
}
