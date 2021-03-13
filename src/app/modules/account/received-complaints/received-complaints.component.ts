import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { ReplyComplaintComponent } from '../reply-complaint/reply-complaint.component';

@Component({
  selector: 'app-received-complaints',
  templateUrl: './received-complaints.component.html',
  styleUrls: ['./received-complaints.component.scss']
})
export class ReceivedComplaintsComponent extends BaseComponent implements OnInit {
  public myComplaints = [
    {
      id: 1,
      complaintNO: 584871,
      sender: 'إبراهيم يوسف',
      details: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها',
      date: new Date()
    },
    {
      id: 2,
      complaintNO: 584872,
      sender: 'مصطفي يحي',
      details: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها',
      date: new Date()
    },
    {
      id: 3,
      complaintNO: 584873,
      sender: 'محمود احمد',
      details: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها',
      date: new Date()
    },
    {
      id: 4,
      complaintNO: 584874,
      sender: 'مصطفي خالد',
      details: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها',
      date: new Date()
    }
  ];

  constructor(public dialog: MatDialog, private route: Router) {
    super();
  }

  ngOnInit() {
  }

  openReplyComplaintDialog() {
    const dialogRef = this.dialog.open(ReplyComplaintComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

