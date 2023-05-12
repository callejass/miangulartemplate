import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/features/users/services/users.service';


/**
 * * Crea y retorna una función de validación asíncrona para verificar si un ID de usuario es único.
 *
 * @param {UsersService} userService - El servicio que se usará para verificar si el id es unico.
 * @returns {AsyncValidatorFn} - Una función de validación asíncrona que toma un control de formulario
 * y retorna un Observable que emite errores de validación o null si la validación pasa.
 *
 * La función de validación resultante se conecta a userService.idUnico para verificar si el valor
 * del control de formulario es un ID de usuario único.
 * 
 * Si el ID de usuario es único, la función de validación retorna un Observable que emite null,
 * indicando que no hay errores de validación.
 *
 * Si el ID de usuario no es único, la función de validación retorna un Observable que emite
 * un objeto de errores de validación. Este objeto tiene una propiedad 'noEsUnico' que se establece en true.
 * 
 * 
 */
export function idUnicoValidador(userService: UsersService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService.idUnico(control.value).pipe(
      map(esUnico => (esUnico ? null : { noEsUnico: true })),
      
    );
  };
}
