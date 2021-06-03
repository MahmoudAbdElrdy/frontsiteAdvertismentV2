import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { UsersServiceProxy, UserDto } from 'src/shared/service-proxies/service-proxies';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../auth/change-password/change-password.component';
import { AppConsts } from 'src/AppConsts';
import { HttpClient } from '@angular/common/http';
import { arrayClear } from 'igniteui-angular-core';
import { Router } from '@angular/router';
export interface ImageInfo {
  imageUrl: string;
  imageName: string;
  imageExtention: string;
  imageSize: string;
}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})


export class EditProfileComponent extends BaseComponent implements OnInit {

  EditProfileForm: FormGroup;
  userId: string;
  userDto: UserDto;
  file2: File[];
  ProfileImage: ImageInfo[] = [];

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,private route: Router,
    private Service: UsersServiceProxy) {
    super();
  }

  ngOnInit() {
    this.userId = localStorage.getItem("user_Id");
    this.buildForm();
    this.loadData();
    this.ImageUrl=new Array<any>();
  }
  baseUrl = AppConsts.baseUrlImage;

  loadData() {
    
    this.Service.get(this.userId).subscribe(
      (result) => {
        this.userDto = result;
        if (result != null || result != undefined) {
          //يوسف محمود this.EditProfileForm.controls['fullName'].setValue(this.userDto.fullName);
          this.EditProfileForm.controls['email'].setValue(this.userDto.email);
          this.EditProfileForm.controls['phoneNumber'].setValue(this.userDto.phoneNumber);
          this.EditProfileForm.controls['firstName'].setValue(this.userDto.firstName);
          this.EditProfileForm.controls['lastName'].setValue(this.userDto.lastName);
          this.EditProfileForm.controls['avatar'].setValue(this.userDto.avatar);
          // this.ProfileImage.push({
          //   imageName: "",
          //   imageSize: "",
          //   imageUrl: this.baseUrl + this.userDto.avatar ,
          //   imageExtention: ""

          // })
          debugger
          this.ImageUrl.push(result.avatar) ;
        }
      },
      (err) => {
        this.errorOccured(err);
      }
    );
  }
  get fc() {
    return this.EditProfileForm.controls;
  }
  //build Form
  buildForm() {
    this.EditProfileForm = this.formBuilder.group({
      //fullName: ['', [Validators.required]],
      phoneNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      avatar: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }



  //submit
  submitEditProfile() {
    // if (this.ProfileImage[0].imageName != "") {
    //   this.EditProfileForm.controls['avatar'].setValue(this.ProfileImage[0].imageUrl);
    // }
    debugger
    if (this.ImageUrl[0] != "") {
      this.EditProfileForm.controls['avatar'].setValue(this.ImageUrl[0]);
    }

    if(this.EditProfileForm.valid){
     
      this.Service.editUser(this.userId, this.EditProfileForm.value).subscribe(
        (result) => {
          this.userDto = result;
          if (result != null || result != undefined) {
            this.showMessageWithType(0, "تم التعديل بنجاح");
            this.route.navigate(['/account/edit-profile'])
          }
        },
        (err) => {
          this.showMessageWithType(1,"يوجد خطأ");
          this.errorOccured(err);
        }
      );
    }
   
  }
  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
  UploadImage2(formData){
 
    return  this.http.post(AppConsts.baseUrl + '/api/UploadFile/FileUpload', formData);
     
  }
  ImageUrl: any;
  fileToUpload = null;
  BaseFile=AppConsts.baseUrlImage;
  uploadImage(event) 
{
debugger
 this.file2 = event.target.files;
 const formData = new FormData();
 for (let index = 0; index < this.file2.length; index++) {
   formData.append('files', this.file2[index]);
}
  this.UploadImage2(formData).subscribe(event => {
debugger
 const result= event as any;
console.log(result)
if(this.ImageUrl==undefined||this.ImageUrl==null){
  this.ImageUrl=result.filePaths;
}
else
{
  this.ImageUrl.push.apply(this.ImageUrl,result.filePaths)

}
 this.fileToUpload=null;
//  this.secondFormGroup.patchValue({
//   images: result.filePaths
//  });
  }
  );
} 
  removeAttachments2(e) {
    this.ImageUrl.splice(e, 1)
  }
}
