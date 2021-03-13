import { FormGroup } from '@angular/forms';


export function Dateformto(controlName: string, controlName2: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const control2 = formGroup.controls[controlName2];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    if (control.value && control2.value) {
      if (control.value < control2.value) {
        if (control.value === control2.value) {
          control.setErrors({ minnumber: true });
        }
        control.setErrors({ minnumber: true });
      } else {
        control.setErrors(null);
      }
    } else {
      control.setErrors(null);
    }
  };
}


export function MustTimeToGreater(controlName: string, controlName2: string) {
  ;
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const control2 = formGroup.controls[controlName2];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    if (control.value && control2.value) {
      if (control.value < control2.value) {
        if (control.value === control2.value) {
          //  control.setErrors({ mustGreater: true });
        }
        control.setErrors({ mustGreater: true });
      } else {
        control.setErrors(null);
      }
    } else {
      control.setErrors(null);
    }
  };
}
