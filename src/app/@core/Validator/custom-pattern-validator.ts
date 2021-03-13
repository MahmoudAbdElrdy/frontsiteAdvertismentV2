import { FormControl, ValidatorFn, FormGroup } from '@angular/forms';
import {
  BuildingType,
  Country,
  DeliveryType,
  Currency, ServiceTypeEnum, PaymentMethod, AccountType
} from 'src/app/@AppService/Enums/Request';
import { WeightRangeModel } from 'src/app/@AppService/models/weight-range.model';

export function customPatternValid(config: any): ValidatorFn {
  return (control: FormControl) => {
    try {
      if (config.pattern === 'Min') {
        if (control.value != null && +control.value < +config.value) {
          let myObjStr = '{"' + config.msg + '":"' + config.msg + '"}';
          return JSON.parse(myObjStr);
        } else {
          control.setErrors(null);
        }
      } else if (config.pattern === 'Max') {
        let urlRegEx: RegExp = config.pattern;
        if (control.value != null && +control.value > +config.value) {
          let myObjStr = '{"' + config.msg + '":"' + config.msg + '"}';
          return JSON.parse(myObjStr);
        } else {
          control.setErrors(null);
        }
      } else if (config.pattern === 'MinLength') {
        let urlRegEx: RegExp = config.pattern;
        if (control.value != null && +control.value.length < +config.value) {
          let myObjStr = '{"' + config.msg + '":"' + config.msg + '"}';
          return JSON.parse(myObjStr);
        } else {
          control.setErrors(null);
        }
      } else if (config.pattern === 'MaxLength') {
        let urlRegEx: RegExp = config.pattern;
        if (control.value != null && +control.value.length > +config.value) {
          let myObjStr = '{"' + config.msg + '":"' + config.msg + '"}';
          return JSON.parse(myObjStr);
        } else {
          control.setErrors(null);
        }
      } else {
        let urlRegEx: RegExp = config.pattern;
        if (
          control.value != null &&
          control.value != '' &&
          !control.value.match(urlRegEx)
        ) {
          let myObjStr = '{"' + config.msg + '":"' + config.msg + '"}';
          if (config.required && control.value == '') {
            let myObjStr = '{"required":"required"}';
            return JSON.parse(myObjStr);
          }
          return JSON.parse(myObjStr);
        } else {
          if (config.required && control.value == '') {
            let myObjStr = '{"required":"required"}';
            return JSON.parse(myObjStr);
          } else {
            control.setErrors(null);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
}
export function CustomValidationRequierdBuilding(
  firstControlName: string,
  SecoundControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[firstControlName];
    const matchingControl = formGroup.controls[SecoundControlName];

    if (
      control.value === BuildingType.Building &&
      (matchingControl.value === '' || !matchingControl.value)
    ) {
      matchingControl.setErrors({ required: true });
    } else {
      if (control.value === BuildingType.Villa) {
        formGroup.controls['floor'].setErrors(null);
        formGroup.controls['appartmentNo'].setErrors(null);
      }
      if (
        control.value === BuildingType.Villa &&
        (matchingControl.value === '' || !matchingControl.value) &&
        SecoundControlName == 'buildingNumber'
      ) {
        matchingControl.setErrors({ required: true });
      } else {
        if (control.value === BuildingType.Building) {
          if (SecoundControlName === 'floor') {
            if (+matchingControl.value < 1) {
              let myObjStr = '{"min":"min"}';

              matchingControl.setErrors(JSON.parse(myObjStr));
            } else {
              matchingControl.setErrors(null);
            }
          }
        }
      }
    }
  };
}

export function CustomValidationRequierdNotBuilding(
  firstControlName: string,
  SecoundControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[firstControlName];
    const matchingControl = formGroup.controls[SecoundControlName];

    // set error on matchingControl if validation fails
    if (control.value === '2' && matchingControl.value === '') {
      matchingControl.setErrors({ required: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function customPatternaValidEmail(config: any): ValidatorFn {
  return (control: FormControl) => {
    const urlRegEx: RegExp = config.pattern;
    if (control.value != null && !control.value.match(urlRegEx)) {
      return {
        invalidEmail: config.invalidEmail,
      };
    } else {
      return null;
    }
  };
}
export function CustomValidationSouldHaveSpace(firstControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[firstControlName];
    if (control.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if ((control.value as string).split(' ').length < 2) {
      control.setErrors({ NameShouldBeSeperated: true });
    } else {
      control.setErrors(null);
    }
  };
}

export function customFeesValid(
  controlName: string,
  controlName2: string,
  internal
) {
  try {
    return (control: FormGroup) => {
      const control1 = control.controls[controlName];
      const control2 = control.controls[controlName2];
      if (control2.value !== ServiceTypeEnum.Envelope && !internal) {

        if (control1.value == 0 || control1.value < 0) {
          control1.setErrors({ invalid: true })
        } else {
          if (!control1.value || control1.value == null) {
            control1.setErrors({ required: true });
          } else {
            control1.setErrors(null);
          }
        }


      } else if (control2.value == ServiceTypeEnum.Envelope && !internal) {
        control1.setErrors(null);
        if (control1.value == 0) {
          control1.setErrors(null);
        } else if (control1.value == null) {
          control1.setErrors({ required: true });
        } else {
          control1.setErrors(null);
        }
      } else {
        control1.setErrors(null);
      }
    };
  } catch (e) { }
}

export function CustomValidationGovernorateId(
  firstControlName: string,
  SecoundControlName: string
) {
  return (formGroup: FormGroup) => {
    try {
      const control = formGroup.controls[firstControlName];
      const matchingControl = formGroup.controls[SecoundControlName];

      // set error on matchingControl if validation fails
      if (
        control.value === Country.IRAQ &&
        (matchingControl.value === '' || !matchingControl.value)
      ) {
        matchingControl.setErrors({ required: true });
      } else {
        matchingControl.setErrors(null);
      }
    } catch (e) { }
  };
}
export function CustomValidationGovernorateName(
  firstControlName: string,
  SecoundControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[firstControlName];
    const matchingControl = formGroup.controls[SecoundControlName];
    try {
      // set error on matchingControl if validation fails
      if (
        control.value !== Country.IRAQ &&
        (matchingControl.value === '' || !matchingControl.value)
      ) {
        matchingControl.setErrors({ required: true });
      } else if (control.value === Country.IRAQ) {
        matchingControl.setErrors(null);
      }
    } catch (e) { }
  };
}

export function RecieveFromClientValidation(
  controlName: string,
  controlName1: string,
  controlName2: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const control1 = formGroup.controls[controlName1];
    const control2 = formGroup.controls[controlName2];

    // set error on matchingControl if validation fails

    if (control.value === true) {
      if (control1.value === '' || control1.value === 0) {
        control1.setErrors({ required: true });
      } else {
        control1.setErrors(null);
      }
      if (control2.value === '') {
        control2.setErrors({ required: true });
      } else {
        control2.setErrors(null);
      }
    } else {
      control1.setErrors(null);
      control2.setErrors(null);
    }
  };
}

export function RecieverPostalCodeValidation(
  controlName: string,
  controlName1: string,
  isInternal
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const control1 = formGroup.controls[controlName1];

    // set error on matchingControl if validation fails

    if (
      control.value === DeliveryType.Office &&
      (control1.value === '' || !control1.value) &&
      isInternal
    ) {
      control1.setErrors({ required: true });
    } else {
      control1.setErrors(null);
    }
  };
}

export function PostalCodeValidation(
  controlName: string,
  controlName1: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const control1 = formGroup.controls[controlName1];

    if (
      control.value === DeliveryType.Office &&
      (control1.value === '' || !control1.value)
    ) {
      //  control1.setErrors({ required: true });
    } else {
      //control1.setErrors(null);
    }
  };
}

export function NotIsAccountAndCach(
  isAccount: boolean,
  isCach: string,
  currency: string,
  total: string
) {
  return (formGroup: FormGroup) => {
    const isCachControl = formGroup.controls[isCach];
    const currencyControl = formGroup.controls[currency];
    const totalControl = formGroup.controls[total];
    // set error on matchingControl if validation fails
    if (
      isAccount === false &&
      isCachControl.value === Currency.IQD &&
      (currencyControl.value === '' || !currencyControl.value)
    ) {
      currencyControl.setErrors({ required: true });

      if (currencyControl.value !== Currency.IQD && totalControl.value == '') {
        totalControl.setErrors({ required: true });
      } else {
        totalControl.setErrors(null);
      }
    } else {
      if (
        currencyControl.value !== Currency.IQD &&
        totalControl.value == '' &&
        isAccount === false
      ) {
        totalControl.setErrors({ required: true });
      } else {
        totalControl.setErrors(null);
      }
      currencyControl.setErrors(null);
    }
  };
}
export function NotIsAccountAndCacha(
  currency: string,
  total: string,
) {
  return (formGroup: FormGroup) => {
    const currencyControl = formGroup.controls[currency];
    const totalControl = formGroup.controls[total];
    ;
    // set error on matchingControl if validation fails
    if (currencyControl.value !== Currency.IQD && totalControl.value == '') {
      totalControl.setErrors({ required: true });
    }
    else if (currencyControl.value === Currency.IQD) {
      totalControl.setErrors(null);
    }
  };
}

// export function NotIsAccountAndNotCach(
//   isAccount: boolean,
//   isCach: string,
//   reference: string
// ) {
//   return (formGroup: FormGroup) => {
//     const isCachControl = formGroup.controls[isCach];
//     const referenceControl = formGroup.controls[reference];

//     // set error on matchingControl if validation fails
//     if (
//       isAccount === false &&
//       isCachControl.value !== PaymentMethod.Cash &&
//       (referenceControl.value === '' || !referenceControl.value)
//     ) {
//       referenceControl.setErrors({ required: true });
//     } else {
//       referenceControl.setErrors(null);
//     }
//   };
// }

export function IsAccount(
  isAccount: string,
  accountNumber: string,
  corporateName: string,
) {
  ;
  return (formGroup: FormGroup) => {
    const accountNumberControl = formGroup.controls[accountNumber];
    const corporateNameControl = formGroup.controls[corporateName];
    const isAccountControl = formGroup.controls[isAccount];
    // set error on matchingControl if validation fails
    if (isAccountControl.value == AccountType.Account) {
      if (accountNumberControl.value === '' || !accountNumberControl.value)
        accountNumberControl.setErrors({ required: true });

      // if (corporateNameControl.value === '' || !corporateNameControl.value)
      //       corporateNameControl.setErrors({ required: true });
    } else {
      accountNumberControl.setErrors(null);
      // corporateNameControl.setErrors(null);
    }
  };
}


export function CustomValidationIraq(
  firstControlName: string,
  SecoundControlName: string,
  ThiedControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[firstControlName];
    const matchingControl = formGroup.controls[SecoundControlName];
    const thired = formGroup.controls[ThiedControlName];

    // set error on matchingControl if validation fails
    if (
      thired.value == false &&
      control.value !== Currency.IQD &&
      (matchingControl.value === '' || !matchingControl.value)
    ) {
      matchingControl.setErrors({ required: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function ValidateWeightRange(
  chargableWeight: string,
  grossWeight: string,
  volumeWeight: string,
  weightRangeList: WeightRangeModel[]
) {
  return (formGroup: FormGroup) => {

    const controlChargableWeight = formGroup.controls[chargableWeight];
    const controlGrossWeight = formGroup.controls[grossWeight];
    const controlVolumeWeight = formGroup.controls[volumeWeight];

    const controlGrossWeightValue = controlGrossWeight.value;
    const controlVolumeWeightValue = controlVolumeWeight.value;

    let value = controlVolumeWeightValue;
    if (controlGrossWeightValue != undefined) {
      if (controlGrossWeightValue > controlVolumeWeightValue) {
        value = controlGrossWeightValue;
      }
    }

    let validweight: boolean = false;
    weightRangeList.forEach((element) => {

      if (
        element.weightFrom <= value &&
        element.weightTo >= value
      ) {
        validweight = true;
      }
    });
    if (validweight) {
      controlChargableWeight.setErrors(null);
    } else {
      controlChargableWeight.setErrors({ notValidWeight: true });
    }
  };
}
