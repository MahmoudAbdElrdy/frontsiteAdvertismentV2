import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '../BaseComponent/BaseComponent';

@Component({
  selector: 'app-confirm-success',
  templateUrl: './confirm-success.component.html',
  styleUrls: ['./confirm-success.component.scss'],
})
export class ConfirmSuccessComponent extends BaseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit() {}

  canecl(): void {
    this.dialogRef.close(0);
  }
  Confirm(): void {
    this.dialogRef.close(1);
    // this.data.action.subscribe((value: BaseResult) => {
    //   this.dialogRef.close(1);
    // });
  }
}
