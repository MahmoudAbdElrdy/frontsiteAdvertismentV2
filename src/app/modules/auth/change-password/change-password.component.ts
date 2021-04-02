import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { AuthServiceProxy, ClientRegisterCommand, ChangePasswordCommand, Result, UserManagementServiceProxy, VerifyCodeCommand } from 'src/shared/service-proxies/service-proxies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {
  showStepper: boolean = true;
  showSuccessMsg: boolean = false;
  FormGroup: FormGroup;
  ChangePassword = new ChangePasswordCommand;
  username: any;
  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, private route: Router, private _formBuilder: FormBuilder
    , private AuthServiceProxy: AuthServiceProxy, private _snackBar: MatSnackBar
  ) {
    super();
  }


  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPass.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {

    this.FormGroup = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],

      confirmPass: ['', Validators.required]
    },
      { validator: this.checkPasswords });
  }

  SendPassword() {
    
    if (this.FormGroup.valid) {
      console.log('try to submit');

      this.ChangePassword.confirmNewPassword = this.FormGroup.value.confirmPass;
      this.ChangePassword.newPassword = this.FormGroup.value.password;
      this.ChangePassword.oldPassword = this.FormGroup.value.oldPassword;

      this.AuthServiceProxy.changePassword(this.ChangePassword).subscribe((data: Result) => {
        ;
        if (data.success != false) {
          ;
          this._snackBar.open("تم تغيير كلمة المرور بنجاح", "  ", {
            duration: 2220,
          });
          this.dialogRef.close();
          this.route.navigateByUrl('/pages/home');
          localStorage.clear();
        }
        else {
          //  this.toastr.error( 'Error occured during login!');
          this._snackBar.open("اضافة", "Error occured during !", {
            duration: 2220,

          });
        }
      },
        err => {
          ;
          console.log(err)
          this.showStepper = true;
          this.showSuccessMsg = false;
          this._snackBar.open("   ", err, {
            duration: 2220,

          });
          //  this.submitted = false;
        }

      )


    }
  }
  closeDialog() {
    this.dialogRef.close();
  }

}

