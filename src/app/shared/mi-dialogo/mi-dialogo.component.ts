import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mi-dialogo',
  templateUrl: './mi-dialogo.component.html',
  styleUrls: ['./mi-dialogo.component.css'],
  
})
export class MiDialogoComponent  {

  constructor(
    public dialogRef:MatDialogRef<MiDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{titulo:string; mensaje:string; submensaje:string}
    ) { }
alConfirmar():void{
  this.dialogRef.close(true);
}
alDescartar():void{
  this.dialogRef.close(false);
}
}
