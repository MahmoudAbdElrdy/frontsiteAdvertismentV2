import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';


@Component({
  selector: 'app-report-ads',
  templateUrl: './report-ads.component.html',
  styleUrls: ['./report-ads.component.scss']
})
export class ReportAdsComponent extends BaseComponent implements OnInit {
  reportAdsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.buildForm();

  }
  get fc() {
    return this.reportAdsForm.controls;
  }
  //build Form
  buildForm() {
    this.reportAdsForm = this.formBuilder.group({
      reportReason: ['', Validators.required]
    });
  }


  //submit
  submitReportAdsForm() {
    console.log('in progress');
  }
}
