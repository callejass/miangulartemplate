import { Component, OnInit } from '@angular/core';
import { User } from '../../users/models/user.model';
import { MiAuthService } from 'src/app/core/services/mi-auth.service';

@Component({
  selector: 'app-detail-account',
  templateUrl: './detail-account.component.html',
  styleUrls: ['./detail-account.component.css']
})
export class DetailAccountComponent implements OnInit {
  miUsuario!: User|null;
  constructor(private authService:MiAuthService) { }

  ngOnInit(): void {
    this.miUsuario=this.authService.miGetUsuario()
  }

}
