import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

import { SpinnerService } from './../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private spinnerService: SpinnerService) { }

    requestCounter: number = 0;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.hayqueincrementar(request)) {
            this.requestCounter++;
        }
        this.setLoading();

        return next.handle(request).pipe(
            finalize(() => {
                if (this.hayquedecrementar(request)) {
                    this.requestCounter--;
                }
                // this.ultima = request.url;
                this.setLoading();
            })
        );


    }
    /** @ignore */
    private hayqueincrementar(request: HttpRequest<any>): boolean {
        // const r: RegExp = new RegExp('.*html$');
        // const r2: RegExp = new RegExp('.*\/upload\/.*$');
        // const r3: RegExp = new RegExp('.*\/notificaciones\/pendientes.*$');
        // return !r.test(request.url) && !r2.test(request.url) && !r3.test(request.url);
        return true;
        
    }
    /** @ignore */
    private hayquedecrementar(request: HttpRequest<any>): boolean {
        // const r: RegExp = new RegExp('.*html$');
        // const r2: RegExp = new RegExp('.*\/upload\/.*$');
        // const r3: RegExp = new RegExp('.*\/notificaciones\/pendientes.*$');
        // return !r.test(request.url) && !r2.test(request.url) && !r3.test(request.url);
        return true;
    }
    /** @ignore */
    private setLoading(): void {
        if (this.requestCounter > 0) {
            this.spinnerService.show();
            // this.spinner.show();
        } else {
            this.spinnerService.hide();
            // this.spinner.hide();
        }
    }
}
