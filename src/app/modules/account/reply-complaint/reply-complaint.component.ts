import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageType } from 'src/app/@AppService/Enums/common';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { EditOrderComplaintCommand, OrderComplaintServiceProxy } from 'src/shared/service-proxies/service-proxies';


@Component({
  selector: 'app-reply-complaint',
  templateUrl: './reply-complaint.component.html',
  styleUrls: ['./reply-complaint.component.scss']
})
export class ReplyComplaintComponent extends BaseComponent implements OnInit {
  replyComplaintForm: FormGroup;
  complain: any;

  constructor(
    private formBuilder: FormBuilder,
    private Service: OrderComplaintServiceProxy,
    public dialogRef: MatDialogRef<ReplyComplaintComponent>,

     @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
debugger
    this.complain=data;

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
    var edit: EditOrderComplaintCommand = new EditOrderComplaintCommand();
    edit.complaintReason = this.complain.complaintReason;
    edit.complaintReasonReplay = this.replyComplaintForm.controls['details'].value;
    edit.id = this.complain.id;
    edit.isComplaintSeen = this.complain.isComplaintSeen;    
      this.Service.editOrderComplaint(edit).subscribe(res => {
        if (res !== null) {
          this.showMessageWithType(MessageType.Success,"تم الرد علي الشكوي بنجاح");         
        }
        else {
          this.showMessageWithType(MessageType.Error,"حدث خطأ عند الرد");                  
        }
        this.dialogRef.close();

      });  
    console.log('in progress');
  }  
}
