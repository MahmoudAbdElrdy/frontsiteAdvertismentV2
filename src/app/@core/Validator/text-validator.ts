import { FormGroup } from '@angular/forms';

export function IsContainSpecialCharacters(controlName: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    ;
    const regEx: RegExp = /^(?!\s*$)[-a-zA-Z0-9_:,.' ']{2,90}$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notText: true });
    } else {
      control.setErrors(null);
    }
  };

}


export function IsCharactersOrNumbers(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    ;
    const regEx: RegExp = /^(?!\s*$)[a-zA-Z0-9]*$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notText: true });
    } else {
      control.setErrors(null);
    }
  };

}

export function IsContainSpecialCharactersNU(controlName: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    ;
    const regEx: RegExp = /^(?!\s*$)[-a-zA-Z0-9_:,.' ']{3,}$/g;
    //const regEx: RegExp = /^(?=.{3,}$)(?=.*[a-z-A-Z])(?=.*[0-9]).*$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notText: true });
    } else {
      control.setErrors(null);
    }
  };

}

export function IsValidStringCharactersForFullName(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    const regEx: RegExp = /(?=^.{6,90}$)^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+(\s+[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+)*$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notString: true });
    } else {
      control.setErrors(null);
    }
  };

}

export function IsValidMobile(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    const regEx: RegExp = /^[0-9]*$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notMobile: true });
    } else {
      control.setErrors(null);
    }
  };

}

export function IsValidPhone(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    const regEx: RegExp = /^[0-9]*$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notPhone: true });
    } else {
      control.setErrors(null);
    }
  };

}

/// Validate Password to Contain one special Charachter ,
// one capital Letter , one small letter  and 6 digits with length at least 9 and maximum 90 Example : Aa@123456
export function IsValidPassword(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    ;
    const passwordRegEx: RegExp = /^^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9].{6,})(?=.*?[^\w\s]).{9,90}$/g;
    if (control.value && !passwordRegEx.test(control.value)) {
      control.setErrors({ notPassword: true });
    } else {
      control.setErrors(null);
    }
  };

  
}

//// Validate for mobile and phone with prefix
export function IsValidMobileRegex(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    const regEx: RegExp = /^(\d{11})$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notMobile: true });
    } else {
      control.setErrors(null);
    }
  };

}


/// Validate email
export function IsValidMail(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    const regEx: RegExp = /(?=^.{10,90}$)^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notMail: true });
    } else {
      control.setErrors(null);
    }
  };

}


/// Contains at chars and numbers only and accept AR
export function IsValidStringًWithNumbersCharacters(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    const regEx: RegExp = /(?=^.{1,90}$)^[a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+(\s+[a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+)*$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notText: true });
    } else {
      control.setErrors(null);
    }
  };

}
export function IsValidStringCharacters(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    const regEx: RegExp = /(?=^.{5,90}$)^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+(\s+[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+)*$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notText: true });
    } else {
      control.setErrors(null);
    }
  };

}
export function IsValidStringًCharactersForAddress(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    const regEx: RegExp = /(?=^.{5,500}$)^[a-zA-Z0-9\-\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+((\s\,)?(\,\s)?\,?\s?([a-zA-Z0-9\-\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]))*?.$/g;
    if (control.value && !regEx.test(control.value)) {
      control.setErrors({ notText: true });
    } else {
      control.setErrors(null);
    }
  };

  
}



export function  MustGreater(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const from = formGroup.controls[controlName];
    const to = formGroup.controls[matchingControlName];

    if (to.errors ) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (from.value >= to.value) {
      to.setErrors({ mustGreater: true });
    } else {
      to.setErrors(null);
    }
  };
}