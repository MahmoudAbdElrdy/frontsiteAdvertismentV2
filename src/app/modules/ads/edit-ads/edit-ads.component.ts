import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { GeoLocationService } from 'src/app/shared/services/geo-location.service';
import { AppConsts } from 'src/AppConsts';
import { AdvertisementServiceProxy,ServiceProxy, CitiesServiceProxy, CountriesServiceProxy, CreateAdvertisementCommand, RegionManagementServiceProxy, GetServiceTypeListCommand, ApplyForAdvertisementCommand, AdsDto, SpaceInfoDto } from 'src/shared/service-proxies/service-proxies';
import { AddLocationComponent } from '../add-ads/add-location/add-location.component';

export interface ImageInfo {
  imageUrl: string;
  imageName: string;
  imageExtention: string;
  imageSize: string;
}

@Component({
  selector: 'app-edit-ads',
  templateUrl: './edit-ads.component.html',
  styleUrls: ['./edit-ads.component.scss']
})
export class EditAdsComponent implements OnInit {

  @ViewChild("CommitModel", { static: false }) CommitModel;
  @Output() next = new EventEmitter<any>();
  secondFormGroup: FormGroup; 

  file2: File[];
  imageInfo2: ImageInfo[] = [];
  AdCategoryList : any[] = [
    {id : 0, name :"Fixed"},
    {id : 1, name : "movable"},
    {id : 2, name :  "Digital"},
    {id : 3, name :  "SocialMedia"},
   
  ];
  AdCategory:any;
  isAuctionable: boolean = false;
  latitude = 24.7444191;
  longitude =46.8323063;
  durations = [
    {
      id: 1,
      name: 'يوم'
    },
    {
      id: 2,
      name: 'يومين'
    },
    {
      id: 3,
      name: '3 أيام'
    },
    {
      id: 4,
      name: '4 أيام'
    },
    {
      id: 5,
      name: '5 أيام'
    },
  ];
  id: any;
  AdDto:AdsDto[];
images: string[];
baseUrl = AppConsts.baseUrlImage;
ApplyForAdvertisementCommand:ApplyForAdvertisementCommand=new ApplyForAdvertisementCommand; 
  countries = [];
  cities = [];
  selectedCountry = 1;
  selectedCity = 1;
  selectedDuration = 2;
  GetServiceTypeListCommand=new GetServiceTypeListCommand();
  services = [  
  ];
Model=new CreateAdvertisementCommand;
  ctrls: FormControl[];
  AdvertisementDetailDto: SpaceInfoDto;
  constructor(
    private _formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private router : Router,
    private CitiesService :CitiesServiceProxy,
    private Service : RegionManagementServiceProxy, private ServiceProxy:  ServiceProxy,private activatedRoute: ActivatedRoute,
    private AdvertisementService:AdvertisementServiceProxy,private _snackBar: MatSnackBar,private Location:GeoLocationService

    ){
   // super();
  }
 
  ngOnInit() {
  debugger
  this.secondFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    isAuction:[null],
    auctionDays: [0],
    description: ['', Validators.required],
    countryId: ['', Validators.required],
    cityId: ['', Validators.required],
    lat: [null],
    lng: [null],    
    images:[[],[]],
    address:[""],
    fromDate:new FormControl(new Date()),
    toDate:new FormControl(new Date()),
    FreeServiceIds:this._formBuilder.array([]),
    adCategory: ['', Validators.required],
  });
  this.LoadServiceTypeList();
    this.LoadCountries();
    this.activatedRoute.queryParams.subscribe(parm => {
      let querySting = parm['id'];
      if (querySting) {
        this.id = querySting;
        this.ApplyForAdvertisementCommand.adId=this.id;
             this.AdvertisementService.getAdvertisementDetail(this.id).subscribe(
          (result) => {
            debugger
            console.log(result);
            ;
            this.secondFormGroup = this._formBuilder.group({
              title: [result.title, Validators.required],
              price: [result.adId, Validators.required],
              isAuction:[result.isAuction],
              auctionDays: [0],
              description: [result.description, Validators.required],
              countryId: [result.cityName, Validators.required],
              cityId: [result.cityName, Validators.required],
              lat: [result.lat],
              lng: [result.lng],    
              images:[result.images,[]],
              address:[result.address],
              fromDate:new FormControl(result.adIntervalFromDate),
              toDate:new FormControl(result.adIntervalToDate),
              FreeServiceIds:this._formBuilder.array([]),
              adCategory: [result.adCategory, Validators.required],
            });
            let formArray = this.secondFormGroup.controls['images'] as FormArray;
            //[src]="'http://localhost:5000/'+oneAds.image+'?w=100&h=100'"
            if(result.images.length>0){
              for(var i=0;i<result.images.length;i++){
                this.imageInfo2.push({
                  imageName: result.images[i],
                  imageSize: "",
                  imageUrl: this.baseUrl+result.images[i]+'?w=100&h=100',
                  imageExtention: ""
                 
                })
              }
             
            }
    
          },
          (err) => {
            this.errorOccured(err);
          }
        );
      }
    });

  
   
   
  }
  errorOccured(err: any) {
    throw new Error('Method not implemented.');
  }
  onCheckboxChange(e) {
    const checkArray: FormArray = this.secondFormGroup.get('FreeServiceIds') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.secondFormGroup.get('FreeServiceIds').value)
  }
  LoadCountries(){

    return this.Service.countries(1,150,"","","").subscribe(res=>{
      this.countries=res.items;
      console.log(this.countries)
    })
   
    
  }
  Change(countryid) {
    debugger
   this. Loadcities(countryid);
}
  Loadcities(countryId){

    return this.CitiesService.getCitiesByCountryId(countryId).subscribe(res=>{
      this.cities=res;
      console.log(this.cities)
    })

    
  }
  LoadServiceTypeList(){

    return this.ServiceProxy.getServiceTypesList(this.GetServiceTypeListCommand).subscribe(res=>{
      this.services=res;
    
     console.log(this.services)
    }) 
  }
  processDataFile2(fileInput: any) {
    ;
    this.file2 = []
    this.file2 = fileInput.files;
    if (this.file2 !== null) {
      for (let index = 0; index < this.file2.length; index++) {
        const element = this.file2[index];
        const size = element.size / Math.log(1024);
        const reader = new FileReader();
        let url
        reader.readAsDataURL(element);
        reader.onload = () => {
          debugger
          url = reader.result.toString();
     
        };



        if (this.imageInfo2.length < 4) {
          setTimeout(() => {
            debugger;
            this.imageInfo2.push({
              imageName: element.name,
              imageSize: size.toString(),
              imageUrl: url,
              imageExtention: ""
            })
          //  this.secondFormGroup.get('images').setValue(url);
            console.log()
            console.log(this.imageInfo2)
          }, 200);
        }

      }
    }
  }

  
  removeAttachments2(e) {
    ;
    this.imageInfo2.splice(e, 1)
  }
  
  onChange($event){
    this.isAuctionable = !this.isAuctionable;
    console.log(this.secondFormGroup.value.isAuction);
  }

  openAddLocationDialog() {
    const dialogRef = this.dialog.open(AddLocationComponent, {
      width: '70%'
    });
    dialogRef.afterClosed().subscribe(data => {
      debugger
      console.log('Child component\'s event was triggered', data);
      this.secondFormGroup.get('lat').setValue(data.latitude);
      this.secondFormGroup.get('lng').setValue(data.longitude);
      this.secondFormGroup.get('address').setValue(data.address);
   });
  }
 


  
  // submitForm(){
  //   if(this.secondFormGroup.valid){
  //     console.log('try to submit'); 
  //     this.showAdsStepper = false;
  //     this.showAddingAdsSuccessMsg = true;
  //     this.showUserServices = true;
  //   }   
  // }
  get fc() {
    return this.secondFormGroup.controls;
  }
  nextstep() {
    ;
    if (this.secondFormGroup.valid) {
      debugger;
    
      this.secondFormGroup.removeControl('countryId');
      let formArray = this.secondFormGroup.controls['images'] as FormArray;
      formArray.patchValue(this.imageInfo2.map(x=>x.imageUrl));
     if( this.secondFormGroup.value.isAuction==true||this.secondFormGroup.value.isAuction==null){
      this.secondFormGroup.value.isAuction=0;
      this.secondFormGroup.value.auctionDays=0;
     }
     else{
      this.secondFormGroup.value.isAuction=1
     }
      this.AdvertisementService.editAdvertisement(this.secondFormGroup.value).subscribe( 
        res=>{
        if(res!==null)
        {
          this._snackBar.open("تم الاضافة بنجاح","اضافة" ,{
            duration: 2220,
            
          });
         // this.router.navigateByUrl('/');
         this.router.navigateByUrl(
          '/ads/UserServices'
        );
          let adsData = {
            secondFormGroup: this.secondFormGroup.value
          }
          this.next.emit(adsData);
        
        }
        else
        {
          this._snackBar.open("حدث خطأ عند الاضافة","الاضافة" ,{
            duration: 2220,
            
          });
        }
     
      })
    
    
    }
  }
}