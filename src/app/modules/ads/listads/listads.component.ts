import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { AdCategoryEnum, AddFavouriteCommand, AdvertisementDtoPageList, AdvertisementServiceProxy, CitiesServiceProxy, RegionManagementServiceProxy,SearchAdvertisementCommand,ServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf,Subscription } from 'rxjs';
import { AppConsts } from 'src/AppConsts';
import { SearchService } from 'src/app/shared/search-service';
@Component({
  selector: 'app-listads',
  templateUrl: './listads.component.html',
  styleUrls: ['./listads.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ListAdsComponent implements OnInit {
  // --------------------------------------------------------
  value: number = 0;
  highValue: number = 800;
  options: Options = {
    floor: 0,
    ceil: 1000
  };
  countries = [];
  cities = [];
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
  SearchAdvertisementCommand: SearchAdvertisementCommand=new SearchAdvertisementCommand();
  AddFavouriteCommand: AddFavouriteCommand=new AddFavouriteCommand();
  countryIdList: any;
  //homeSlides2: CreatUpdtaeHomeSliderDto;
  checkboxesDataList : any[] = [
    {name : "اللوحات الإعلانية الثابتة", id :0,isChecked: false},
    {name : "اللوحات الإعلانية المحمولة", id : 1,isChecked: false},
    {name : "اللوحات الإعلانية الرقمية", id :  2,isChecked: false},
    {name : "إعلان التواصل ", id :  3,isChecked: false},]
  constructor(
    private router : Router,private Service :AdvertisementServiceProxy,private _snackBar: MatSnackBar,
    private dialog: MatDialog,private CitiesService :CitiesServiceProxy,
    private ServiceRegion : RegionManagementServiceProxy, private ServiceProxy:  ServiceProxy,private SearchService:SearchService
  ) {
this.SearchAdvertisementCommand.countryId=new Array<string>();
this.SearchAdvertisementCommand.cityId=new Array<string>();
this.SearchAdvertisementCommand.maxPrice=this.highValue;
this.SearchAdvertisementCommand.minPrice=this.value;
this.SearchAdvertisementCommand.adCategoryies=new Array<AdCategoryEnum>();
  }

  ngAfterViewInit() {
    ;
   this.LoadData();
   
   if(this.SearchService.SearchAdvertisementCommand!==null){
     this.advanced();
   }
   }
ngOnInit(): void {
  this.LoadCountries();
 
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
        
         this.List = data.items;
         console.log(this.List)
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
 LoadCountries(){

  return this.ServiceRegion.countries(1,150,"","","").subscribe(res=>{
    this.countries=res.items;
    console.log(this.countries)
  })
 
  
}
Change(event,countryid) {
  
 
 this. Loadcities(countryid);
      if (event.checked === true) {
            this.SearchAdvertisementCommand.countryId.push(countryid);
        }

        if (event.checked === false) {
            var index: number = this.SearchAdvertisementCommand.countryId.indexOf(countryid);
            this.SearchAdvertisementCommand.countryId.splice(index, 1);
            
        }
}
ChangeCities(event,cityId) {
  
 //this. Loadcities(countryid);
      if (event.checked === true) {
            this.SearchAdvertisementCommand.cityId.push(cityId);
        }

        if (event.checked === false) {
            var index: number = this.SearchAdvertisementCommand.cityId.indexOf(cityId);
            this.SearchAdvertisementCommand.cityId.splice(index, 1);
            
        }
}
Loadcities(countryId){

  return this.CitiesService.getCitiesByCountryId(countryId).subscribe(res=>{
    this.cities=res;
    console.log(this.cities)
  })
}
  addToFavorite(e, oneAds){
    
this.AddFavouriteCommand.adId=oneAds.adId;
    this.Service.addFavourite(this.AddFavouriteCommand)
      .subscribe( 
        
        error => {
          console.log(error)
          this._snackBar.open("حدث خطأ عند الاضافة","الاضافة" ,{
          duration: 2220,
          
        })},
        res=>{
         
         
        if(res!==null)
        {
          this._snackBar.open("تم الاضافة بنجاح","اضافة" ,{
            duration: 2220,
            
          });
        
        }
        else
        {
          this._snackBar.open("حدث خطأ عند الاضافة","الاضافة" ,{
            duration: 2220,
            
          });
        }
     
      })
    
  }
  goToDetails(id: number) {
    ;
   // this.router.navigate(["/lookups/Advertisements-Details", id]);
    this.router.navigateByUrl(
      '/ads/ads-details?id=' + id
    );
  }
  advancedSearch(){
    
//this.SearchAdvertisementCommand.cityId=
this.SearchAdvertisementCommand.title=localStorage.getItem("searchProduct");
this.SearchAdvertisementCommand.maxPrice=this.highValue;
this.SearchAdvertisementCommand.minPrice=this.value;
this.checkboxesDataList.forEach((value, index) => {
  if (value.checked) {
    this.SearchAdvertisementCommand.adCategoryies.push(value.id);
  }
});
    merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
 ;
        return this.Service.searchAdvertisement(this.SearchAdvertisementCommand)
      }),
      map((data) => {
       
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
    console.log('in progress');
  }
  advanced(){
    

    merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
 ;
        return this.Service.searchAdvertisement(this.SearchService.SearchAdvertisementCommand)
      }),
      map((data) => {
       
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
    console.log('in progress');
  }
}


