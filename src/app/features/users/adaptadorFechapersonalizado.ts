import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { parse, format, isValid  } from 'date-fns';
@Injectable() 
export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null{
    
    if (typeof value === 'string'&& value.length === 10 ) {
      const parsedDate =parse(value, 'dd/MM/yyyy', new Date());
      if (isValid(parsedDate)) {
        
        return parsedDate
      }
    } 
    
    return null;
  }

  override format(date: Date,displayFormat:string ): string {
    return format(date, 'dd/MM/yyyy');
  }
  
}



