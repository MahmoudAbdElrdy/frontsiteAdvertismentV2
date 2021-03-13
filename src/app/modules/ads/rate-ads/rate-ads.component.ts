import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';

@Component({
  selector: 'app-rate-ads',
  templateUrl: './rate-ads.component.html',
  styleUrls: ['./rate-ads.component.scss']
})

export class RateAdsComponent extends BaseComponent implements OnInit {
  rateAdsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.buildForm();

  }
  get fc() {
    return this.rateAdsForm.controls;
  }
  //build Form
  buildForm() {
    this.rateAdsForm = this.formBuilder.group({
      yourComment: ['']
    });
  }


  //submit
  submitrateAdsForm() {
    console.log('in progress');
  }
}
