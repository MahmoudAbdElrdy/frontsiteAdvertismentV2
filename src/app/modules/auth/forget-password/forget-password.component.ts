import  { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { AuthServiceProxy, ClientRegisterCommand, ForgetPasswordCommand, Result, UserManagementServiceProxy, VerifyCodeCommand } from 'src/shared/service-proxies/service-proxies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent  extends BaseComponent implements OnInit {
  showStepper : boolean = true;
  showSuccessMsg : boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  ForgetPassword=new ForgetPasswordCommand;
  VerifyCodeCommand=new VerifyCodeCommand;
  username: any;
  constructor(public dialogRef: MatDialogRef<ForgetPasswordComponent>,private route: Router,private _formBuilder: FormBuilder
    ,private AuthServiceProxy:AuthServiceProxy,private _snackBar: MatSnackBar
    ) {
    super();
  }

  
  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPass.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      phoneNumber: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      sentCode: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      password: ['', Validators.required],
      confirmPass: ['', Validators.required]
    },
    { validator: this.checkPasswords });
  }

  SendMobile(){
    
    if(this.firstFormGroup.valid){      
      console.log('try to submit');    
      
    this.ForgetPassword.username=this.firstFormGroup.value.phoneNumber;
   this.username=this.firstFormGroup.value.phoneNumber;
    this.AuthServiceProxy.forgetPassword(this.ForgetPassword).subscribe((data:Result)=>{
      ;
    
      if(data.success != false)
       { 
             this._snackBar.open("تم تسجيل  بنجاح","  " ,{
               duration: 2220,
               
             });
             console.log(data.data);
             //this.showStepper = false;
          //  this.showSuccessMsg = true;
           //  this.router.navigate(['/dashboard']);
             /** spinner starts on init */
       
             /** spinner ends after 5 seconds */
           
       }
       else{
       //  this.toastr.error( 'Error occured during login!');
       this._snackBar.open("اضافة","Error occured during !" ,{
         duration: 2220,
         
       });
       }
     },
    err=>{;
      console.log(err)
      this.showStepper = true;
      this.showSuccessMsg = false;
      this._snackBar.open("   ",err,{
        duration: 2220,
        
      });
    //  this.submitted = false;
    }
    
    )
  
     
    }
  }
  SendCode(){
    
    if(this.secondFormGroup.valid){      
      console.log('try to submit');    
      
    this.VerifyCodeCommand.username=this.firstFormGroup.value.phoneNumber;
    this.VerifyCodeCommand.code=this.secondFormGroup.value.sentCode;
    this.AuthServiceProxy.verifyCode(this.VerifyCodeCommand).subscribe((data:Result)=>{
      ;
    
      if(data.success != false)
       { 
             this._snackBar.open("تم تسجيل  بنجاح","  " ,{
               duration: 2220,
               
             });
             console.log(data.data);
             //this.showStepper = false;
          //  this.showSuccessMsg = true;
           //  this.router.navigate(['/dashboard']);
             /** spinner starts on init */
       
             /** spinner ends after 5 seconds */
           
       }
       else{
       //  this.toastr.error( 'Error occured during login!');
       this._snackBar.open("اضافة","Error occured during !" ,{
         duration: 2220,
         
       });
       }
     },
    err=>{;
      console.log(err)
      this.showStepper = true;
      this.showSuccessMsg = false;
      this._snackBar.open("   ",err,{
        duration: 2220,
        
      });
    //  this.submitted = false;
    }
    
    )
  
     
    }
  }
  SendPassword(){
    
    if(this.secondFormGroup.valid){      
      console.log('try to submit');    
      
    this.VerifyCodeCommand.username=this.firstFormGroup.value.phoneNumber;
    this.VerifyCodeCommand.code=this.secondFormGroup.value.sentCode;
    this.AuthServiceProxy.changePassword(this.VerifyCodeCommand).subscribe((data:Result)=>{
      ;
    
      if(data.success != false)
       { 
             this._snackBar.open("تم تسجيل  بنجاح","  " ,{
               duration: 2220,
               
             });
             console.log(data.data);
             //this.showStepper = false;
          //  this.showSuccessMsg = true;
           //  this.router.navigate(['/dashboard']);
             /** spinner starts on init */
       
             /** spinner ends after 5 seconds */
           
       }
       else{
       //  this.toastr.error( 'Error occured during login!');
       this._snackBar.open("اضافة","Error occured during !" ,{
         duration: 2220,
         
       });
       }
     },
    err=>{;
      console.log(err)
      this.showStepper = true;
      this.showSuccessMsg = false;
      this._snackBar.open("   ",err,{
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

