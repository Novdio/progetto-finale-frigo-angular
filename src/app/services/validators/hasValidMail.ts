import { AbstractControl, ValidatorFn } from '@angular/forms';

export function hasValidMail(): ValidatorFn {
  //ignora riga 3 e 5, sono sempre uguali Map<string,QualsiasiCosa>
  return (control: AbstractControl): { [key: string]: any } | null => {
    let value: string = control.value || '';

    let hasGmail = '@gmail';

    if (!value.includes(hasGmail))
      return {
        passwordErr: 'La email deve essere @gmail',
      };

    return null;
  };
}
