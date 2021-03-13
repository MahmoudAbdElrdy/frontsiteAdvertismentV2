import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { AdvertisementDtoPageList, AdvertisementServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf,Subscription } from 'rxjs';
import { AppConsts } from 'src/AppConsts';
@Component({
  selector: 'app-listads',
  templateUrl: './listads.component.html',
  styleUrls: ['./listads.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ListAdsComponent implements OnInit {
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
  List 		      : AdvertisementDtoPageList[];
  dataSource: MatTableDataSource<any>;
  popUpDeleteUserResponse : any;
  resultsLength = 0;
  displayedColumns : string [] = ['id','vendorName','title','adType','cityName','price','fromDate','toDate','image', 'actions'];
	@ViewChild(MatPaginator,{static: false}) paginator : MatPaginator;
	@ViewChild(MatSort,{static: false}) sort           : MatSort;
  close: any;
  length=0;
  subscriptions: Subscription[]=[];
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
ngOnInit(): void {
}
LoadData() {
 
   merge(this.paginator.page)
     .pipe(
       startWith({}),
       switchMap(() => {
  ;
         return this.Service.getAllAdvertisement(this.paginator.pageIndex+1,this.paginator.pageSize,"","","")
       }),
       map((data) => {
        debugger
         this.List = data.items;
         this.resultsLength = data.metadata.totalItemCount;
       
         return  this.List;
       }),
       catchError(() => {
         return observableOf([]);
       })
     )
     .subscribe((data) => {
       ;
       this.paginator.pageIndex= this.paginator.pageIndex;
       this.List = data;
     });
 }
  addToFavorite(e, indx){
    e.stopPropagation();
    this.adsList[indx].isFavorite = !this.adsList[indx].isFavorite;
  }
  goToDetails(id: number) {
    ;
   // this.router.navigate(["/lookups/Advertisements-Details", id]);
    this.router.navigateByUrl(
      '/ads/ads-details?id=' + id
    );
  }
  advancedSearch(){
    console.log('in progress');
  }
}

