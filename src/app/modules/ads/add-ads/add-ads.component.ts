import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { AddLocationComponent } from './add-location/add-location.component';

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss']
})
export class AddAdsComponent extends BaseComponent implements OnInit {
  steper: number = 1;
  FormStepOne: any;
  FormStepTwo: any;
  showAdsStepper : boolean = true;
  showUserServices: boolean = false;
  showAddingAdsSuccessMsg: boolean = false;
  constructor(){
    super();
  }

  ngOnInit() {
  }

  addCommercialRegister(event) {
    this.FormStepOne = event.firstFormGroup;
    console.log(event);
    this.steper = 2
  }
  adsDetails(event) {
    this.steper = 2
    this.FormStepTwo = event.secondFormGroup;
    this.submitForm();
  }

  submitForm(){
    console.log('try to submit'); 
    this.showAdsStepper = false;
    this.showAddingAdsSuccessMsg = true;
    this.showUserServices = true; 
  }
}