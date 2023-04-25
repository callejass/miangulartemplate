import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { User } from "../../models/user.model";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit{
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
