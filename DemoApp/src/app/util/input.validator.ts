import { AbstractControl } from '@angular/forms';

export function ValidateTxtBox(control: AbstractControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { whitespace : true }
}