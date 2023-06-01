import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { timer } from "rxjs";
import { Subscription } from "rxjs";

import { SpinnerService } from "../../core/services/spinner.service";
import { MiAuthService } from "src/app/core/services/mi-auth.service";
import { User } from "src/app/features/users/models/user.model";
import { SessionService } from "src/app/core/services/session.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  public usuarioAutenticado:any;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner: boolean = false;
  userName: string = "";
  isAdmin: boolean = false;

  temaSeleccionado = "theme2";

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    private authService: MiAuthService,
    private sessionService:SessionService
  ) {
    this.mobileQuery = this.media.matchMedia("(max-width: 1000px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.usuarioAutenticado= this.sessionService.currentUser
  }
  // logOut() {
  //   this.authService.miLogOut();
  // }
  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  changeTheme(tema: string): void {
    this.temaSeleccionado = tema;
  }

  logOut(){
    this.sessionService.logOut();
  }
}
