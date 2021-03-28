import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { AdsDto, AdvertisementDtoPageList, AdvertisementServiceProxy, GetMyAds } from 'src/shared/service-proxies/service-proxies';
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


  myAdsList:AdsDto[];
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
         return this.Service.getMyAds(this.GetMyAds)
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
       this.myAdsList = data;
       console.log(this.myAdsList);
     });
 }
  GetMySpaces(GetMySpaces: any): import("rxjs").Observable<AdsDto[]> {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
  }
  goToDetails(id: number) {
    this.router.navigateByUrl(
      '/ads/ads-details?id=' + id
    );
  }
  openSubmitComplaintDialog(ad) {
    const dialogRef = this.dialog.open(SubmitComplaintComponent, {
      width: '50%',
      data: { ad: ad }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

