import { Component, OnInit } from '@angular/core';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit{
  constructor(private sesionService:SessionService){}
  ngOnInit(): void {
    console.log('esto es el principio')
      this.sesionService.initialize()
  }
}
