import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';

 
import { SpinnerService } from '../../core/services/spinner.service';
import { MiAuthService } from 'src/app/core/services/mi-auth.service';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements  OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    userName: string = "222222222222222";
    isAdmin: boolean = false;

    temaSeleccionado = 'theme2';
    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        private authService:MiAuthService
        
        ) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    logOut(){
        this.authService.miLogOut();

    }
    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    changeTheme(tema: string): void {
        this.temaSeleccionado=tema;
    }
}
