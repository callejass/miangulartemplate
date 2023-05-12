import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mi-snackbar',
  templateUrl: './mi-snackbar.component.html',
  styleUrls: ['./mi-snackbar.component.css']
})
export class MiSnackbarComponent  {

  
  
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
    constructor(private snackBar: MatSnackBar) {}
  
    openSnackBar() {
      this.snackBar.open('Cannonball!!', 'Splash', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
  
  


