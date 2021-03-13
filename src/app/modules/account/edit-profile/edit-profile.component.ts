import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends BaseComponent implements OnInit {
  EditProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.buildForm();

  }
  get fc() {
    return this.EditProfileForm.controls;
  }
  //build Form
  buildForm() {
    this.EditProfileForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      mobile: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      currentPass: ['', Validators.required],
      newPass: ['', Validators.required],
      confirmNewPass: ['', Validators.required]
    },
    { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.newPass.value;
    const confirmPass = group.controls.confirmNewPass.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  //submit
  submitEditProfile() {
    console.log('in progress');

  }
}
