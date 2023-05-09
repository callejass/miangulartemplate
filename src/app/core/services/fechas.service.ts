import { Injectable } from '@angular/core';
import { format, parse } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class FechasService {
  convertirAString(fecha:Date):string{
    return format(fecha,'yyyy-MM-dd');
    
  };
  convertirDeString(fecha: string): string {
    const parsedData=parse(fecha,'dd/MM/yyyy', new Date());
    return format(parsedData, 'dd/MM/yyyy', );
  }
  
  



  constructor() { }
}
