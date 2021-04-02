import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { AdsDto, AdvertisementDtoPageList, AdvertisementServiceProxy, GetAdIntervalInstallments, GetAdIntervals, GetMyAds, GetMySpaces } from 'src/shared/service-proxies/service-proxies';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { AppConsts } from 'src/AppConsts';
@Component({
  selector: 'app-intervals-installment',
  templateUrl: './intervals-installment.component.html',
  styleUrls: ['./intervals-installment.component.scss']
})
export class IntervalsInstallmentComponent  implements OnInit {
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
  GetAdIntervals: GetAdIntervalInstallments = new GetAdIntervalInstallments();
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
    this.GetAdIntervals.adIntervalId = id;
    return this.Service.getAdIntervalsInstallment(this.GetAdIntervals).subscribe(res => {
      this.Intervals = res;
      console.log(this.Intervals)
    })


  }

 
}
