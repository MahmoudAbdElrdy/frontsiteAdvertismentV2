import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.scss']
})
export class SendRequestComponent  extends BaseComponent implements OnInit {
  sendRequestForm: FormGroup;
  id: number = 0;
  showSendRequestForm: boolean = true;
  showRequestSuccessMsg: boolean = false;
  showServiceProviderRequestForm: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute) {
    super();
  }
  submitted = false;

  ngOnInit() {
    this.buildSendRequestForm();

  }


  buildSendRequestForm() {
    this.sendRequestForm = this.formBuilder.group({
      name: ['', Validators.required],
      cardNo: ['', Validators.required],
      cardExpiry: ['', Validators.required],
      CVV: ['', Validators.required],
      moreInfo: [''],
    }
    );
  }

  submitRequest() {
    //this.submitted = true;
    if(this.sendRequestForm.valid){
      this.showSendRequestForm = false;
      this.showRequestSuccessMsg = true;
      this.showServiceProviderRequestForm = true;
    }
  }

}
