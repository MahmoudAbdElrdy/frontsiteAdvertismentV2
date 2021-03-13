import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';


@Component({
  selector: 'app-submit-complaint',
  templateUrl: './submit-complaint.component.html',
  styleUrls: ['./submit-complaint.component.scss']
})
export class SubmitComplaintComponent extends BaseComponent implements OnInit {
  submitComplaintForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.buildForm();

  }
  get fc() {
    return this.submitComplaintForm.controls;
  }
  //build Form
  buildForm() {
    this.submitComplaintForm = this.formBuilder.group({
      complaintDetails: ['', Validators.required]
    });
  }


  //submit
  doSubmitComplaintForm() {
    console.log('in progress');
  }
}
