import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { AdsDto, AdvertisementDtoPageList, AdvertisementServiceProxy, GetMyAds, GetMySpaces } from 'src/shared/service-proxies/service-proxies';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf,Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { SubmitComplaintComponent } from '../submit-complaint/submit-complaint.component';
import { AppConsts } from 'src/AppConsts';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent  implements OnInit {
  public adsImagesPath = 'assets/img/ads/';
  // public myRequests = [
  //   {
  //     id: 1,
  //     requestNO: 584871,
  //     title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
  //     image: 'ads1.png',
  //     description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
  //     price: 3200,
  //     owner: 'مصطفي خالد',
  //     badge: 'قابل للمزايدة',
  //     date: new Date()
  //   },
  //   {
  //     id: 2,
  //     requestNO: 584872,
  //     title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
  //     image: 'ads2.png',
  //     description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
  //     price: 4300,
  //     owner: 'السيد حسان',
  //     badge: '',
  //     date: new Date()
  //   },
  //   {
  //     id: 3,
  //     requestNO: 584873,
  //     title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
  //     image: 'ads3.png',
  //     description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
  //     price: 6000,
  //     owner: 'طاهر الطاهر',
  //     badge: '',
  //     date: new Date()
  //   },
  //   {
  //     id: 4,
  //     requestNO: 584874,
  //     title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
  //     image: 'ads4.png',
  //     description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
  //     price: 2200,
  //     owner: 'سالم السالم',
  //     badge: 'قابل للمزايدة',
  //     date: new Date()
  //   }
  // ];

  myAdsList:AdsDto[];
  GetMySpaces:GetMySpaces=new GetMySpaces();
  myRequests: AdsDto[];
  baseUrlImage = AppConsts.baseUrlImage;
  //homeSlides2: CreatUpdtaeHomeSliderDto;
  constructor(
    private router : Router,private Service :AdvertisementServiceProxy,private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

  }

  ngAfterViewInit() {
    ;
   this.LoadData();
   }

LoadData() {
 
   merge()
     .pipe(
       startWith({}),
       switchMap(() => {
  ;
         return this.Service.getMySpaces(this.GetMySpaces)
       }),
       map((data) => {
        debugger
         this.myRequests = data;
       
         return  this.myRequests;
       }),
       catchError(() => {
         return observableOf([]);
       })
     )
     .subscribe((data) => {
       ;
     
       this.myAdsList = data;
       console.log(this.myAdsList);
     });
 }
  ngOnInit() {
  }
  goToDetails(id: number) {
    ;
   // this.router.navigate(["/lookups/Advertisements-Details", id]);
    this.router.navigateByUrl(
      '/ads/ads-details?id=' + id
    );
  }
  openSubmitComplaintDialog() {
    const dialogRef = this.dialog.open(SubmitComplaintComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

