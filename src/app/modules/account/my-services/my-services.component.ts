import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { AdvertisementDtoPageList, AdvertisementServiceProxy, EditPaidServicesCommand, GetMyServiceCommand, PaidServicesDto } from 'src/shared/service-proxies/service-proxies';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { AppConsts } from 'src/AppConsts';
@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.scss']
})
export class MyservicesComponent implements OnInit {
  // --------------------------------------------------------
  value: number = 100;
  highValue: number = 800;
  options: Options = {
    floor: 0,
    ceil: 1000
  };
  //-------------------------------------------------------------------------
  public servicesImagesPath = 'assets/img/services/';
  public servicesList = [
  ];
  List: AdvertisementDtoPageList[];
  dataSource: MatTableDataSource<any>;
  popUpDeleteUserResponse: any;
  resultsLength = 0;
  displayedColumns: string[] = ['id', 'adTitle', 'clientName', 'fromDate', 'toDate'];

  // displayedColumns: string[] = ['id', 'vendorName', 'title', 'adType', 'cityName', 'price', 'fromDate', 'toDate', 'image', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  close: any;
  length = 0;
  subscriptions: Subscription[] = [];
  myservicesList: any;
  getMySpaces: GetMyServiceCommand = new GetMyServiceCommand();
  baseUrlImage = AppConsts.baseUrlImage;
  isReject: any;
  Intervals: any;
  showEdit: boolean = false;
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
  showEidtFun(service) {
    service.showEdit = true;
  }
  LoadData() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.Service.getMyService(this.getMySpaces)
        }),
        map((data) => {

          this.myservicesList = data;
          return this.myservicesList;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        debugger
        this.myservicesList = data;
        console.log(this.myservicesList);
      });
  }
  addToFavorite(e, indx) {
    e.stopPropagation();
    this.servicesList[indx].isFavorite = !this.servicesList[indx].isFavorite;
  }
  LoadIntervals(oneservices) {
    debugger

    this.router.navigateByUrl(
      '/account/services-Intervals?id=' + oneservices.id
    );

  }
  goToDetails(id: number) {
    // this.router.navigate(["/lookups/Advertisements-Details", id]);
    this.router.navigateByUrl(
      '/services/services-details?id=' + id
    );
  }
  goToEdit(service: any) {
    // this.router.navigate(["/lookups/Advertisements-Details", id]);
    var editPaidServicesCommand: EditPaidServicesCommand = new EditPaidServicesCommand();
    editPaidServicesCommand.serviceId = service.id;
    editPaidServicesCommand.price = service.price;
    debugger
    this.Service.editPaidService(editPaidServicesCommand).subscribe(data => {
      debugger
      service.showEdit = false;

      console.log(this.myservicesList);
    });
  }
  Reject(el) {
    el.rejected = !el.rejected;
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
      this.isReject = el.rejected;
      this.LoadData();
    })
  }
  advancedSearch() {
    console.log('in progress');
  }
}




//  public servicesImagesPath = 'assets/img/services/';
//   public myservicesList = [
//     {
//       id: 1,
//       title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
//       image: 'services1.png',
//       description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
//       price: 3200,
//       owner: 'مصطفي خالد',
//       badge: 'قابل للمزايدة',
//       date: new Date()
//     },
//     {
//       id: 2,
//       title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
//       image: 'services2.png',
//       description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
//       price: 4300,
//       owner: 'السيد حسان',
//       badge: '',
//       date: new Date()
//     },
//     {
//       id: 3,
//       title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
//       image: 'services3.png',
//       description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
//       price: 6000,
//       owner: 'طاهر الطاهر',
//       badge: '',
//       date: new Date()
//     },
//     {
//       id: 4,
//       title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
//       image: 'services4.png',
//       description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
//       price: 2200,
//       owner: 'سالم السالم',
//       badge: 'قابل للمزايدة',
//       date: new Date()
//     }
//   ];