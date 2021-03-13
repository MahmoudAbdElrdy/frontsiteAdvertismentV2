import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
})
export class ChangeLanguageComponent extends BaseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChangeLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close(0);
  }
}
