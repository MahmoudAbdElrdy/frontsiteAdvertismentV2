import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { MatDialog } from '@angular/material/dialog';
import { ReportAdsComponent } from '../report-ads/report-ads.component';
import { RateAdsComponent } from '../rate-ads/rate-ads.component';
import { GoToLocationComponent } from '../go-to-location/go-to-location.component';
import {  AdsDto, AdvertisementServiceProxy, ApplyForAdvertisementCommand, SpaceInfoDto } from 'src/shared/service-proxies/service-proxies';
import { ModelServiceService } from 'src/app/shared/model-service.service';
import { AppConsts } from 'src/AppConsts';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-adsDetails',
  templateUrl: './adsDetails.component.html',
  styleUrls: ['./adsDetails.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class AdsDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  // --------------------------------------------------------
  value: number = 100;
  highValue: number = 800;
  options: Options = {
    floor: 0,
    ceil: 1000
  };
  // -----------------------------------------------------------------------
  auctionFormGroup: FormGroup;
  //-------------------------------------------------------------------------
  public adsImagesPath = 'assets/img/ads/';
  public relatedAdsList = [
  
  ];
  disableBtn:false;
  id: any;
AdvertisementDetailDto:SpaceInfoDto;
AdDto:AdsDto[];
images: string[];
baseUrlImage = AppConsts.baseUrlImage;
ApplyForAdvertisementCommand:ApplyForAdvertisementCommand=new ApplyForAdvertisementCommand;
  dateFilterFn: (date: Date) => boolean;
  //homeSlides2: CreatUpdtaeHomeSliderDto;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: Router,private activatedRoute: ActivatedRoute,
    private Service: AdvertisementServiceProxy,private ModelServiceService:ModelServiceService,private _snackBar: MatSnackBar,
  ) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(parm => {
      let querySting = parm['id'];
      if (querySting) {
        this.id = querySting;
        this.ApplyForAdvertisementCommand.adId=this.id;
        this.ModelServiceService.ApplyForAdvertisementCommand=this.ApplyForAdvertisementCommand;
        this.Service.getAdvertisementDetail(this.id).subscribe(
          (result) => {
            console.log(result);
            ;
            this.AdvertisementDetailDto = result;
            //this.dateFilterFn = (date: Date)=> [result.adIntervalFromDate.getDay(),result.adIntervalToDate.getDay()].includes(date.getDay());    
            this.dateFilterFn = (d: Date): boolean => {
              // Prevent dates in ranges from being selected.
              return !(d >= result.adIntervalFromDate && d <= result.adIntervalToDate) 
              
            }
            console.log( this.dateFilterFn)
            if(result!=null||result!=undefined){
            //  this.AdDto=result.a;
            var galleryImage=result.images;
           
            galleryImage.forEach((item, index) => {

//[src]="this.baseUrlImage+oneAds.image+'?w=100&h=100'"
              this.galleryImages.push({ small: this.baseUrlImage+item+'?w=100&h=100',
               medium:this.baseUrlImage+item+'?w=100&h=100',big:this.baseUrlImage+item+'?w=100&h=100' });
            
            });
           
            }
          
          },
          (err) => {
            this.errorOccured(err);
          }
        );
      }
      
    });
    
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4
      }
    ];
    //this.galleryImages.push()
   
    this.galleryImages = [
       
    ];

    this.auctionFormGroup = this._formBuilder.group({
      auctionPrice: ['', Validators.required]
    });
  }
  errorOccured(err: any) {
    throw new Error("Method not implemented.");
  }
  submitAuctionForm(){
    console.log('in progress');
  }
  DateFilter(){

  }

  addToFavorite(e, indx){
    e.stopPropagation();
    this.relatedAdsList[indx].isFavorite = !this.relatedAdsList[indx].isFavorite;
  }

  openReportAdsDialog() {
    const dialogRef = this.dialog.open(ReportAdsComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openRateAdsDialog() {
    const dialogRef = this.dialog.open(RateAdsComponent, {
      width: '33%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
SendRequest(){
  ///ads/ServiceProviderRequest
  
  if(this.ApplyForAdvertisementCommand.fromDate===null||this.ApplyForAdvertisementCommand.fromDate===undefined){
    
         this._snackBar.open(" يجب اضافة التاريخ  ","التاريخ",{
        duration: 2220,
        
      });
        return;
    
  }
  if(this.ApplyForAdvertisementCommand.toDate===null||this.ApplyForAdvertisementCommand.toDate===undefined){
    
    this._snackBar.open(" يجب اضافة التاريخ  ","التاريخ",{
   duration: 2660,
   
 });
   return;

}
if(this.ApplyForAdvertisementCommand.fromDate>=this.ApplyForAdvertisementCommand.toDate){
  this._snackBar.open(" يجب التاريخ من اصغر من الي   ","التاريخ",{
    duration: 2660,
    
  });
    return;
}
  this.route.navigateByUrl(
    '/ads/ServiceProviderRequest' 
  );
}
dohome(){
 
  this.route.navigateByUrl('/pages/home');
 
}
  openAdsLocationDialog() {
    const dialogRef = this.dialog.open(GoToLocationComponent, {
      width: '70%'
    });
  }
}

