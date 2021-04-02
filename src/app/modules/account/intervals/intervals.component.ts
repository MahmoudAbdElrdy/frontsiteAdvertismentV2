import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { AdsDto, AdvertisementDtoPageList, AdvertisementServiceProxy, GetAdIntervals, GetMyAds, GetMySpaces } from 'src/shared/service-proxies/service-proxies';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { AppConsts } from 'src/AppConsts';

@Component({
  selector: 'app-intervals',
  templateUrl: './intervals.component.html',
  styleUrls: ['./intervals.component.scss']
})
export class IntervalsComponent implements OnInit {
  // --------------------------------------------------------

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
  myAdsList: any;
  getMySpaces: GetMySpaces = new GetMySpaces();
  GetAdIntervals: GetAdIntervals = new GetAdIntervals();
  baseUrlImage = AppConsts.baseUrlImage;
  isReject: any;
  Intervals: any;
  //homeSlides2: CreatUpdtaeHomeSliderDto;
  constructor(
    private router: Router, private Service: AdvertisementServiceProxy, private _snackBar: MatSnackBar,
    private dialog: MatDialog,private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(parm => {
      let querySting = parm['id'];
      if (querySting) {
       this.LoadIntervals(querySting);
      }
      
    });
  }

  LoadIntervals(id) {
    debugger
    this.GetAdIntervals.adId = id;
    return this.Service.getAdIntervals(this.GetAdIntervals).subscribe(res => {
      this.Intervals = res;
      console.log(this.Intervals)
    })


  }
  goToDetails(id: number) {
    // this.router.navigate(["/lookups/Advertisements-Details", id]);
    this.router.navigateByUrl(
      '/account/ads-IntervalsInstallment?id=' + id
    );
  }
 
}
