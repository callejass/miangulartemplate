import { FormControl } from '@angular/forms';
import * as moment from 'moment';

 export function fechaFormatoValido(control: FormControl) {
  const fecha = control.value;
  const formato = 'DD/MM/YYYY';

  if (!fecha) {
    return null;
  }

  const fechaMoment = moment(fecha, formato, true);

  return fechaMoment.isValid() ? null : { formatoInvalido: true };
}
