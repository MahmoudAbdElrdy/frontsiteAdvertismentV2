import { FormGroup, ValidatorFn } from '@angular/forms';

// Price
export function IsValidPriceNumber(controlName: string): ValidatorFn | any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    const regExPrice: RegExp = /^([0-9]{1,9})+(\.[0-9]{0,2})?$/g;
    if (control.value && !regExPrice.test(control.value)) {
      control.setErrors({ notPrice: true });
    }
    else if (control.value == 0) {
      control.setErrors({ notPrice: true });
    } else {
      control.setErrors(null);
    }

  };
}
export function IsValidPriceNumbera(controlName: string): ValidatorFn | any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    const regExPrice: RegExp = /^[0-9]{0,9}(\.[0-9]{1,2})?$|^(100)(\.[0]{1,2})?$/;
    if (control.value && !regExPrice.test(control.value)) {
      ;
      control.setErrors({ notPrice: true });
    } else {
      control.setErrors(null);
    }
  };
}
export function IsValidReferenceNumber(controlName: string): ValidatorFn | any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    const regExPrice: RegExp = /^[0-9]{0,90}?$/;
    if (control.value && !regExPrice.test(control.value)) {
      ;
      control.setErrors({ notReferenceNumber: true });
    } else {
      control.setErrors(null);
    }
  };
}
// Number xxx.xx
export function IsNumber(controlName: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    const regEx: RegExp = /^([0-9]{1,3})+(\.[0-9]{0,2})?$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notNumber: true });
    } else {
      control.setErrors(null);
    }
  };
}
export function IsNumberhasnot(controlName: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    const regEx: RegExp = /^([0-9]{1,3})+(\.[0-9]{0,2})?$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notNumber: true });
    } else {
      control.setErrors(null);
    }
  };
}
// int only xxxx
export function IsValidInt(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    const regEx: RegExp = /(?<=\s|^)\d+(?=\s|$)/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notRange: true });
    } else {
      control.setErrors(null);
    }
  };
}
// xxx
export function IsValidOfficeCode(controlName: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    const regEx: RegExp = /^([0-9]{3,3})?$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notCode: true });
    } else {
      control.setErrors(null);
    }
  };
}


export function MustTimeToGreaterOREqual(controlName: string, controlName2: string) {
  ;
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const control2 = formGroup.controls[controlName2];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    if (control.value && control2.value) {
      if (control.value <= control2.value) {
        if (control.value === control2.value) {
          //  control.setErrors({ mustGreater: true });
        }
        control.setErrors({ mustGreaterOrEqual: true });
      } else {
        control.setErrors(null);
      }
    } else {
      control.setErrors(null);
    }
  };
}
export function MustTimeToLessOREqual(controlName: string, controlName2: string) {
  ;
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const control2 = formGroup.controls[controlName2];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    if (control.value && control2.value) {
      if (control.value >= control2.value) {
        if (control.value === control2.value) {
          //  control.setErrors({ mustGreater: true });
        }
        control.setErrors({ mustLessOrEqual: true });
      } else {
        control.setErrors(null);
      }
    } else {
      control.setErrors(null);
    }
  };
}

