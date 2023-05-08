import { Injectable } from '@angular/core';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class FechasService {
  convertirAString(fecha:Date):string{
    return format(fecha,'yyyy-MM-dd');
    
  }

  constructor() { }
}
