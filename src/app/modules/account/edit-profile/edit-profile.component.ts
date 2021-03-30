import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { UsersServiceProxy, UserDto } from 'src/shared/service-proxies/service-proxies';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../auth/change-password/change-password.component';
import { AppConsts } from 'src/AppConsts';
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

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private Service: UsersServiceProxy) {
    super();
  }

  ngOnInit() {
    this.userId = localStorage.getItem("user_Id");
    this.buildForm();
    this.loadData();
  }
  baseUrl = AppConsts.baseUrlImage;

  loadData() {
    debugger
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
          this.ProfileImage.push({
            imageName: "",
            imageSize: "",
            imageUrl: this.baseUrl + this.userDto.avatar + '?w=100&h=100',
            imageExtention: ""

          })

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
    if (this.ProfileImage[0].imageName != "") {
      this.EditProfileForm.controls['avatar'].setValue(this.ProfileImage[0].imageUrl);
    }

    this.Service.editUser(this.userId, this.EditProfileForm.value).subscribe(
      (result) => {
        this.userDto = result;
        if (result != null || result != undefined) {

        }
      },
      (err) => {
        this.errorOccured(err);
      }
    );
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
          debugger
          url = reader.result.toString();

        };



        if (this.ProfileImage.length < 1) {
          setTimeout(() => {
            debugger;
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
  removeAttachments2(e) {
    this.ProfileImage.splice(e, 1)
  }
}
