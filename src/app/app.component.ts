import { Component, OnInit } from '@angular/core';
import { SessionService } from './core/services/session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit{
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sesionService:SessionService){}
  ngOnInit(): void {
    console.log('esto es el principio')
      this.sesionService.initialize()
      .subscribe((haySesion: boolean) => {
        if(!haySesion){
          this.router.navigate(['/login'],{queryParams:{backUrl:this.route.snapshot.url}});
          //login?returnUrl=/users/detail/1
        }
      })
  }
}
