import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {



  private visibility = new BehaviorSubject(false);

  get visibility$(): Observable<boolean>{
    return this.visibility.asObservable();
  }
  constructor() {
  }

  show() {
    this.visibility.next(true);
  }

  hide() {
    setTimeout(() => {
      this.visibility.next(false);  
    }, 1000);
    
  }

  test(seconds: number): void {
    this.visibility.next(true);
    setTimeout(() => {
      this.visibility.next(false);
    }, seconds*1000);
  }

}
