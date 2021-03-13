import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends BaseComponent implements OnInit {
  public notificationsList = [
    {
      id: 1,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      description: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات',
      date: new Date(),
      readed: false
    },
    {
      id: 2,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      description: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات',
      date: new Date(),
      readed: false
    },
    {
      id: 3,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      description: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات',
      date: new Date(),
      readed: false
    },
    {
      id: 4,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      description: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات',
      date: new Date(),
      readed: false
    },
    {
      id: 5,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      description: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات',
      date: new Date(),
      readed: false
    }
  ];

  //homeSlides2: CreatUpdtaeHomeSliderDto;
  constructor(
    private route: Router
  ) {
    super();
  }

  ngOnInit() {
  }

  changeStatus(indx){
    this.notificationsList[indx].readed = true;
  }
}

