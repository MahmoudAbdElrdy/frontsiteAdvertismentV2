import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import {OrderComplaintServiceProxy,CreateOrderComplaintCommand } from 'src/shared/service-proxies/service-proxies';


@Component({
  selector: 'app-submit-complaint',
  templateUrl: './submit-complaint.component.html',
  styleUrls: ['./submit-complaint.component.scss']
})
export class SubmitComplaintComponent extends BaseComponent implements OnInit {
  submitComplaintForm: FormGroup;
  orderId: any;
  orderDtails: any;
  ad: any;
  ComplainType: any;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private Service: OrderComplaintServiceProxy,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SubmitComplaintComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    debugger
    this.ad=data.ad;
    this.ComplainType=data.ComplainType;
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
    debugger
    var add: CreateOrderComplaintCommand = new CreateOrderComplaintCommand();
    add.complaintReason = this.submitComplaintForm.controls['complaintDetails'].value;
    add.orderId =this.ComplainType==1? this.ad.intervalId:this.ad.id;
    add.complainType=this.ComplainType;

    this.Service.addOrderComplaint(add).subscribe(res => {
      if (res !== null) {
        this.showMessageWithType(0, "تم الابلاغ بنجاح");
        ;
        this._snackBar.open("تم الابلاغ بنجاح", " تبليغ عن اعلان", {
          duration: 2220,
        });
        this.dialogRef.close();
      }
      else {
        this._snackBar.open("حدث خطأ عند التعديل", "تعديل", {
          duration: 2220,
        });
      }
      this.dialogRef.close();
    });  }
}
