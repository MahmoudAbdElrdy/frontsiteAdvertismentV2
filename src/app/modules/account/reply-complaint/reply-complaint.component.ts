import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';


@Component({
  selector: 'app-reply-complaint',
  templateUrl: './reply-complaint.component.html',
  styleUrls: ['./reply-complaint.component.scss']
})
export class ReplyComplaintComponent extends BaseComponent implements OnInit {
  replyComplaintForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.buildForm();

  }
  get fc() {
    return this.replyComplaintForm.controls;
  }
  //build Form
  buildForm() {
    this.replyComplaintForm = this.formBuilder.group({
      details: ['', Validators.required]
    });
  }


  //submit
  doReplyComplaintForm() {
    console.log('in progress');
  }
}
