import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IsNumber } from 'src/app/@core/Validator/number-validator';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/@AppService/models/Register.model';
import { RegisterService } from 'src/app/@AppService/services/Register.service';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthServiceProxy, ClientRegisterCommand, UserManagementServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { TranslateService } from '@ngx-translate/core';
export interface ImageInfo {
  imageUrl: string;
  imageName: string;
  imageExtention: string;
  imageSize: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  RegisterForm: FormGroup;
  ProfileImage: ImageInfo[] = [];
  file2: File[];
  lang: string;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>, private AuthServiceProxy: AuthServiceProxy,
    private formBuilder: FormBuilder, private route: Router, private translate: TranslateService) {
    super();
    this.lang = this.translate.getDefaultLang();
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
      //  fullName: ['', [Validators.required]],
      phoneNumber:['', Validators.compose([Validators.required,Validators.pattern(
        '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'
          )])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.compose([
        Validators.required, 
        Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
 ])] ,
      confirmPass: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      avatar: ['', Validators.required],
      lang: [this.lang],
      webToken: [localStorage.getItem("fcm_web_token")],
      Roles: new FormArray([], Validators.required),

    },
      { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPass.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onCheckChange(event) {

    const formArray: FormArray = this.RegisterForm.get('Roles') as FormArray;

    /* Selected */
    if (event.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.source.value));
    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.source.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
  //submit
  submitRegister() {

    if (this.ProfileImage[0].imageName != "") {
      this.RegisterForm.controls['avatar'].setValue(this.ProfileImage[0].imageUrl);
    }
    ;
    let registerDto: ClientRegisterCommand = this.RegisterForm.value;
if(this.RegisterForm.valid){
  this.AuthServiceProxy
  .clientRegister(registerDto)
  .subscribe(
    (result) => {
      debugger
      
if(result.error!=null){
this.showMessageWithType(1,result.error);
}
else{
this.showMessageWithType(0, "You have been registered successfully");
this.goToList();
this.dialogRef.close();
}
     
    },
    (err) => {debugger
      console.log(err)
     // this.showMessageWithType(1, "An error has occurred please try again later" + err);
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
  removeAttachments2(e) {
    this.ProfileImage.splice(e, 1)
  }
  processDataFile2(fileInput: any) {
    this.file2 = []
    this.file2 = fileInput.files;
    if (this.file2 !== null) {
      for (let index = 0; index < this.file2.length; index++) {
        const element = this.file2[index];
        const size = element.size / Math.log(1024);
        const reader = new FileReader();
        let url
        reader.readAsDataURL(element);
        reader.onload = () => {

          url = reader.result.toString();

        };



        if (this.ProfileImage.length < 1) {
          setTimeout(() => {
            ;
            this.ProfileImage.push({
              imageName: element.name,
              imageSize: size.toString(),
              imageUrl: url,
              imageExtention: ""
            });
            //  this.secondFormGroup.get('images').setValue(url);
            console.log()
            console.log(this.ProfileImage)
          }, 200);
        }

      }
    }
  }

}
