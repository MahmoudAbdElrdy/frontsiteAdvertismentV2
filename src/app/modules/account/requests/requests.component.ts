import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { AdsDto, AdvertisementDtoPageList, AdvertisementServiceProxy, GetMyAds, GetMyServices, ServicesDto } from 'src/shared/service-proxies/service-proxies';
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
  GetMyAds:GetMyAds=new GetMyAds();
  GetMyServices:GetMyServices=new GetMyServices();



  myAdsList:AdsDto[];
  myRequests: AdsDto[];
  myservices: ServicesDto[];

  baseUrlImage = AppConsts.baseUrlImage;
  servies:ServicesDto[];
  //homeSlides2: CreatUpdtaeHomeSliderDto;
  constructor(
    private router : Router,private Service :AdvertisementServiceProxy,private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

  }

  ngAfterViewInit() {
   this.LoadData();
   this.LoadDataSercies();
   }

LoadData() { 
   merge()
     .pipe(
       startWith({}),
       switchMap(() => {
         return this.Service.getMyAds(this.GetMyAds)
       }),
       map((data) => {        
         this.myRequests = data;       
         return  this.myRequests;
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
 LoadDataSercies() { 
  merge()
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.Service.getMyServices(this.GetMyServices)
      }),
      map((data) => {       
        this.myservices = data;       
        return  this.myservices;
      }),
      catchError(() => {
        return observableOf([]);
      })
    )
    .subscribe((data) => {
      this.myservices = data;
    });
}
  GetMySpaces(GetMySpaces: any): import("rxjs").Observable<AdsDto[]> {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
  }
  goToDetails(id: number) {
    // this.router.navigateByUrl(
    //   '/ads/ads-details?id=' + id
    // );
  }
  openSubmitComplaintDialog(ad,ComplainType) {
    const dialogRef = this.dialog.open(SubmitComplaintComponent, {
      width: '50%',
      data: { ad: ad,ComplainType:ComplainType }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

