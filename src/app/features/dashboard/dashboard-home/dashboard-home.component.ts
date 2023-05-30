import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { User } from '../../users/models/user.model';
import { MiAuthService } from 'src/app/core/services/mi-auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  usuarioActual!: User | null;

  constructor(private notificationService: NotificationService,
    
    private titleService: Title,
    private logger: NGXLogger,
    private authService:MiAuthService) {
  }

  ngOnInit() {
    // this.usuarioActual=this.authService.miGetUsuario()
    this.titleService.setTitle('angular-material-template - Dashboard');
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
}
