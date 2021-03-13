import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IsNumber } from 'src/app/@core/Validator/number-validator';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/@AppService/models/Register.model';
import { RegisterService } from 'src/app/@AppService/services/Register.service';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthServiceProxy, ClientRegisterCommand, UserManagementServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  RegisterForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,private AuthServiceProxy:AuthServiceProxy,
     private formBuilder: FormBuilder, private route: Router, private registerService: RegisterService) {
    super();
  }

  ngOnInit() {
    this.buildForm();

  }
  get fc() {
    return this.RegisterForm.controls;
  }
  //build Form
  buildForm() {
    this.RegisterForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      roletype: ['', Validators.required],
      confirmPass: ['', Validators.required],
    
    },
    { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPass.value;
    return pass === confirmPass ? null : { notSame: true };
  }


  //submit
  submitRegister() {
    console.log('in progress');
    debugger;
    var Check=this.RegisterForm.get('roletype').value;
    let registerDto: ClientRegisterCommand = this.RegisterForm.value;

this.RegisterForm.removeControl('roletype');
if(Check=='advertiser'){
  this.AuthServiceProxy
  .clientRegister(registerDto)
  .subscribe(
    (result) => {
      this.showMessageWithType(0, "You have been registered successfully");
      debugger;

      this.goToList();
      this.dialogRef.close();
    },
    (err) => {
      console.log(err)
      this.showMessageWithType(1, "An error has occurred please try again later"+err);
    }
  );
}
else{
  this.AuthServiceProxy
  .clientRegister(registerDto)
  .subscribe(
    (result) => {
      this.showMessageWithType(0, "You have been registered successfully");
      debugger;

      this.goToList();
      this.dialogRef.close();
    },
    (err) => {
      console.log(err)
      this.showMessageWithType(1, "An error has occurred please try again later"+err);
    }
  );
}
   

  }
  goToList() {
    this.route.navigateByUrl('/');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
