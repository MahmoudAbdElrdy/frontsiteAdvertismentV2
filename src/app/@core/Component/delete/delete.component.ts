import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { BaseResult } from 'src/app/@AppService/models/common.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent extends BaseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.data.data.subscribe((value: BaseResult) => {
      this.dialogRef.close();
      this.showMessage(value);
    });
  }
}
