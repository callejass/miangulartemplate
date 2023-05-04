import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Pipe({
  name: 'dateFormat'
})
export class FormateoFechaPipe implements PipeTransform {
  transform(value: string): string {
    const fechaNacimientoDate = parseISO(value);
    return format(fechaNacimientoDate, 'dd/MM/yyyy');
  }
}
