import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  OrderComplaintServiceProxy,OrderComplaintDtoPageList } from 'src/shared/service-proxies/service-proxies';
import { MatDialog } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf } from 'rxjs';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { ReplyComplaintComponent } from '../reply-complaint/reply-complaint.component';

@Component({
  selector: 'app-received-complaints',
  templateUrl: './received-complaints.component.html',
  styleUrls: ['./received-complaints.component.scss']
})

export class ReceivedComplaintsComponent extends BaseComponent implements OnInit {
  public myComplaints = [] ;
   

  constructor(public dialog: MatDialog,private Service:OrderComplaintServiceProxy, private route: Router) {
    super();
  }

  ngOnInit() {
    
  }
  ngAfterViewInit() {
    this.LoadData();
  }
  LoadData() {

    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.Service.getAllOrderComplaintByUserId(undefined)
        }),
        map((data) => {
          debugger
          this.myComplaints = data;
          return this.myComplaints;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        this.myComplaints = data;
      });
  }
  openReplyComplaintDialog(data) {
    const dialogRef = this.dialog.open(ReplyComplaintComponent, {
      width: '50%',
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

