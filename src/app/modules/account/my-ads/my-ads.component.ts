import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { AdsDto, AdvertisementDtoPageList, AdvertisementServiceProxy, GetMyAds } from 'src/shared/service-proxies/service-proxies';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { AppConsts } from 'src/AppConsts';
@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {
  // --------------------------------------------------------
  value: number = 100;
  highValue: number = 800;
  options: Options = {
    floor: 0,
    ceil: 1000
  };
  //-------------------------------------------------------------------------
  public adsImagesPath = 'assets/img/ads/';
  public adsList = [
  ];
  List: AdvertisementDtoPageList[];
  dataSource: MatTableDataSource<any>;
  popUpDeleteUserResponse: any;
  resultsLength = 0;
  displayedColumns: string[] = ['id', 'vendorName', 'title', 'adType', 'cityName', 'price', 'fromDate', 'toDate', 'image', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  close: any;
  length = 0;
  subscriptions: Subscription[] = [];
  myAdsList: any;
  GetMyAds: GetMyAds = new GetMyAds();
  baseUrlImage = AppConsts.baseUrlImage;
  isReject: any;
  //homeSlides2: CreatUpdtaeHomeSliderDto;
  constructor(
    private router: Router, private Service: AdvertisementServiceProxy, private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

  }

  ngAfterViewInit() {
    this.LoadData();
  }
  ngOnInit(): void {
  }
  LoadData() {

    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.Service.getMySpaces(this.GetMyAds)
        }),
        map((data) => {
          debugger
          this.myAdsList = data;
          return this.myAdsList;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        this.myAdsList = data;
        console.log(this.myAdsList);
      });
  }
  addToFavorite(e, indx) {
    e.stopPropagation();
    this.adsList[indx].isFavorite = !this.adsList[indx].isFavorite;
  }
  goToDetails(id: number) {
    // this.router.navigate(["/lookups/Advertisements-Details", id]);
    this.router.navigateByUrl(
      '/ads/ads-details?id=' + id
    );
  }
  goToEdit(id: number) {
    // this.router.navigate(["/lookups/Advertisements-Details", id]);
    this.router.navigateByUrl(
      '/ads/edit-ads?id=' + id
    );
  }
  Reject(el) {
    el.rejected= !el.rejected;
    this.Service.disableAdvertisement(el.rejected, el.spaceId).subscribe(res => {
      if (res.rejected == true) {
        this._snackBar.open("تم التفعيل بنجاح", "التفعيل", {
          duration: 2220,

        });
      }

      else if (res.rejected == false) {
        this._snackBar.open("تم الايقاف بنجاح", "الايقاف", {
          duration: 2220,

        });
      }
      else {
        this._snackBar.open("حدث خطأ  ", "التفعيل", {
          duration: 2220,

        });
      }
      this.isReject=el.rejected;
      this.LoadData();
    })
  }
  advancedSearch() {
    console.log('in progress');
  }
}




//  public adsImagesPath = 'assets/img/ads/';
//   public myAdsList = [
//     {
//       id: 1,
//       title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
//       image: 'ads1.png',
//       description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
//       price: 3200,
//       owner: 'مصطفي خالد',
//       badge: 'قابل للمزايدة',
//       date: new Date()
//     },
//     {
//       id: 2,
//       title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
//       image: 'ads2.png',
//       description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
//       price: 4300,
//       owner: 'السيد حسان',
//       badge: '',
//       date: new Date()
//     },
//     {
//       id: 3,
//       title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
//       image: 'ads3.png',
//       description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
//       price: 6000,
//       owner: 'طاهر الطاهر',
//       badge: '',
//       date: new Date()
//     },
//     {
//       id: 4,
//       title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
//       image: 'ads4.png',
//       description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
//       price: 2200,
//       owner: 'سالم السالم',
//       badge: 'قابل للمزايدة',
//       date: new Date()
//     }
//   ];