import { RegisterComponent } from 'src/app/modules/auth/register/register.component';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { AddFavouriteCommand, AdvertisementDtoPageList, AdvertisementServiceProxy, GetMyFavourite } from 'src/shared/service-proxies/service-proxies';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf,Subscription } from 'rxjs';
import { AppConsts } from 'src/AppConsts';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class FavoritesComponent implements OnInit {
  public adsImagesPath = 'assets/img/ads/';
  public homeSlides = [
    {
      id: 1,
      title: 'slide 1',
      caption: 'لإيجــار جميـع أنــواع المساحات الإعلانية',
      image: 'slide1.png'
    },
    {
      id: 2,
      title: 'slide 2',
      caption: 'إمتلك مساحتك الإعلانية',
      image: 'slide2.png'
    },
    {
      id: 3,
      title: 'slide 3',
      caption: 'إعلانك هنا',
      image: 'slide3.png'
    }
  ];
  public latestAds = []

  List 		      : AdvertisementDtoPageList[];
  dataSource: MatTableDataSource<any>;
  popUpDeleteUserResponse : any;
  resultsLength = 0;
  baseUrlImage = AppConsts.baseUrlImage;
  AddFavouriteCommand: AddFavouriteCommand=new AddFavouriteCommand();
  GetMyFavourite:GetMyFavourite=new GetMyFavourite();
  	@ViewChild(MatPaginator,{static: false}) paginator : MatPaginator;
	@ViewChild(MatSort,{static: false}) sort           : MatSort;
  close: any;
  length=0;
  subscriptions: Subscription[]=[];
  longitude: number;
  latitude: number;
  //homeSlides2: CreatUpdtaeHomeSliderDto;
  constructor(
    private router : Router,private Service :AdvertisementServiceProxy,private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

  }
  // GoToDetails(Id: number) {
  //   this.route.navigateByUrl(
  //     '/pages/newsdetails?id=' + Id
  //   );
  // }

  ngOnInit() {
    //;
    // this.homeSliderService
    //   .GetLoadById(0)
    //   .subscribe((data) => {
    //     this.homeSlides2 = data.innerData;
    //   });
    this.getLocation();
    this.Load();
  }
  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          ;
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          console.log(this.longitude)
          console.log(this.latitude)
        
        });
    } else {
       console.log("No support for geolocation")
    }
  }
 
  Load(){

    return this.Service.getMyFavourites(this.GetMyFavourite)
    .subscribe(res=>{
    
      this.List=res;
      console.log(res);
    })}
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
  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

