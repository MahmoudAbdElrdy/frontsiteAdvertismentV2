import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { NotificationDto, NotificationServiceProxy } from 'src/shared/service-proxies/service-proxies';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends BaseComponent implements OnInit {
  public notificationsList :NotificationDto[];

  //homeSlides2: CreatUpdtaeHomeSliderDto;
  constructor(
    private route: Router,
    private service:NotificationServiceProxy
  ) {
    super();
  }

  ngOnInit() {
    this.loadNotification();
  }
  loadNotification() {
    this.service.getAllNotification(1,1000,undefined,undefined,undefined).subscribe(n=>{
      this.notificationsList=n.items;
    });
  }

  changeStatus(notification:NotificationDto,indx){
    this.service.read(notification.id).subscribe(n=>{
      if(n.success)
      {
        this.notificationsList[indx].read = true;
      }
    });
  }
}

