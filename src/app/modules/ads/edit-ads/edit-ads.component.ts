import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { GeoLocationService } from 'src/app/shared/services/geo-location.service';
import { AppConsts } from 'src/AppConsts';
import { AdvertisementServiceProxy, ServiceProxy, CitiesServiceProxy, CountriesServiceProxy, CreateAdvertisementCommand, RegionManagementServiceProxy, GetServiceTypeListCommand, ApplyForAdvertisementCommand, AdsDto, SpaceInfoDto, ServiceTypeDto, EditAdvertisementCommand } from 'src/shared/service-proxies/service-proxies';
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
  service: any[];
  @ViewChild("CommitModel", { static: false }) CommitModel;
  @Output() next = new EventEmitter<any>();
  secondFormGroup: FormGroup;

  file2: File[];
  imageInfo2: ImageInfo[] = [];
  AdCategoryList : any[] = [
    {id : 0, name :"Fixed",nameAR:"ثابت"},
    {id : 1, name : "movable",nameAR:"متحرك"},
    {id : 2, name :  "Digital",nameAR:"رقمي"},
    {id : 3, name :  "SocialMedia",nameAR:"التواصل الاجتماعي"},
   
  ];
  optionValue:any;
  AdCategory: any;
  isAuctionable: boolean = false;
  latitude = 24.7444191;
  longitude = 46.8323063;
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
  AdDto: AdsDto[];
  images: string[];
  baseUrl = AppConsts.baseUrl;
  ApplyForAdvertisementCommand: ApplyForAdvertisementCommand = new ApplyForAdvertisementCommand;
  EditAdvertisementCommand: EditAdvertisementCommand = new EditAdvertisementCommand;
  BaseFile=AppConsts.baseUrlImage;
  @ViewChild('userPhoto', { static: false }) userPhoto: ElementRef;
  countries = [];
  cities = [];
  selectedCountry = 1;
  selectedCity = 1;
  selectedDuration = 2;
  GetServiceTypeListCommand = new GetServiceTypeListCommand();
  services = [
  ];
  Images: any;
  Model = new CreateAdvertisementCommand;
  ctrls: FormControl[];
  AdvertisementDetailDto: SpaceInfoDto;
  imagesOld:any=[];
  constructor(private http: HttpClient,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,private _decimalPipe: DecimalPipe,
    private CitiesService: CitiesServiceProxy,
    private Service: RegionManagementServiceProxy, private ServiceProxy: ServiceProxy, private activatedRoute: ActivatedRoute,
    private AdvertisementService: AdvertisementServiceProxy, private _snackBar: MatSnackBar, private Location: GeoLocationService

  ) {
    this.service = new Array;
    this.imagesOld=new Array;
    // super();
  }
  ngOnInit() {
    this.LoadServiceTypeList();
    this.LoadCountries();
    this.secondFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      isAuction: [true],
      auctionDays: [1],
      description: ['', Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      lat: [null],
      lng: [null],
      images: [[], []],
      address: [""],
      fromDate: new FormControl(new Date()),
      toDate: new FormControl(new Date()),
      FreeServiceIds: this._formBuilder.array([]),
      adCategory: ['', Validators.required],
    });





  }
  UploadImage2(formData){
 
    return  this.http.post(AppConsts.baseUrl + '/api/UploadFile/FileUpload', formData);
     
  }
  ImageUrl: any;
  fileToUpload = null;
 
  uploadImage(event) 
{
debugger
 this.file2 = event.target.files;
 const formData = new FormData();
 for (let index = 0; index < this.file2.length; index++) {
   formData.append('files', this.file2[index]);
}
  this.UploadImage2(formData).subscribe(event => {
debugger
 const result= event as any;
console.log(result)

this.ImageUrl.push.apply(this.ImageUrl,result.filePaths)
 this.fileToUpload=null;
//  this.secondFormGroup.patchValue({
//   images: result.filePaths
//  });
  }
  );
} 
  get permissionsArr() {
    return this.secondFormGroup.get('FreeServiceIds') as FormArray;
  }
  errorOccured(err: any) {
    throw new Error('Method not implemented.');
  }
  onCheckboxChange(e) {
    debugger
    const checkArray: FormArray = this.secondFormGroup.get('FreeServiceIds') as FormArray;

    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      checkArray.removeAt(checkArray.value.findIndex(x => x === e.source.value));
    }
    console.log(this.secondFormGroup.get('FreeServiceIds').value)
  }
  LoadCountries() {

    return this.Service.countries(1, 150, "", "", "").subscribe(res => {
      this.countries = res.items;
      console.log(this.countries)
    })


  }
  Change(countryid) {

    this.Loadcities(countryid);
  }
  Loadcities(countryId) {

    return this.CitiesService.getCitiesByCountryId(countryId).subscribe(res => {
      this.cities = res;
      console.log(this.cities)
    })


  }
  LoadServiceTypeList() {

    return this.ServiceProxy.getRequestTypesList(this.GetServiceTypeListCommand).subscribe(res => {
      this.services = res;

      this.activatedRoute.queryParams.subscribe(parm => {
        let querySting = parm['id'];
        if (querySting) {
          this.id = querySting;
          this.ApplyForAdvertisementCommand.adId = this.id;
          this.AdvertisementService.getAdvertisementById(this.id).subscribe(
            (result) => {
              console.log(result);
              this.secondFormGroup = this._formBuilder.group({
                title: [result.title, Validators.required],
                price: [this._decimalPipe.transform(result.price, '1.0', 'en-US'), Validators.required],
                isAuction: [false],
                auctionDays: [1],
                description: [result.description, Validators.required],
                countryId: [result.countryId, Validators.required],
                cityId: [result.cityId, Validators.required],
                lat: [result.lat],
                lng: [result.lng],
                images: [result.images, []],
                address: [result.address],
                // fromDate: new FormControl(result.fromDate),
                // toDate: new FormControl(result.toDate),
                FreeServiceIds: new FormArray([]),
                adCategory: [result.adCategory, Validators.required]
              });
              if (result.cityId != null) {
                this.Loadcities(result.countryId);
              }
              this.ImageUrl = result.images;
              // if (result.images.length > 0) {
              //   for (var i = 0; i < result.images.length; i++) {
              //     this.imageInfo2.push({
              //       imageName: result.images[i],
              //       imageSize: "",
              //       imageUrl: this.baseUrl + result.images[i] ,
              //       imageExtention: ""
              //     })
              //   }
              // }
  this.optionValue=result.adCategory;
              var list: any = result.freeServices.map(x => x.serviceTypeId);
  
              const checkArray: FormArray = this.secondFormGroup.get('FreeServiceIds') as FormArray;
              debugger
              this.services.map((perm, i) => {
               debugger
                //  this.permissionsArr.at(i).patchValue(true)
                if (list.find(x => x == perm.id) != null) {
                  let obj: any = { name: perm.name.ar,description:perm.description.ar, value: true, serviceTypeId: perm.id };
                  this.service.push(obj)
                  checkArray.push(new FormControl(perm.id));
                  //this.permissionsArr.at(i).patchValue(true)
                } else {
                  let obj: any = { name: perm.name.ar,description:perm.description.ar, value: false, serviceTypeId: perm.id };
                  this.service.push(obj)
                }
  
  
              })
            },
            (err) => {
              this.errorOccured(err);
            }
          );
        }
      });
      console.log(this.services)
    })
  }
  processDataFile2(fileInput: any) {
    debugger
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
          url = reader.result.toString();
        };
        if (this.imageInfo2.length < 4) {
          setTimeout(() => {
            
            this.imageInfo2.push({
              imageName: element.name,
              imageSize: size.toString(),
              imageUrl: url,
              imageExtention: ""
            })
          }, 200);
        }
      }
    }
  }
  removeAttachments2(e) {
  debugger
  this.ImageUrl.splice(e, 1);
    //this.imagesOld.push(this.imageInfo2[e].imageName)
  }
  onChange($event) {
    this.isAuctionable = !this.isAuctionable;
    console.log(this.secondFormGroup.value.isAuction);
  }
  openAddLocationDialog() {
    const dialogRef = this.dialog.open(AddLocationComponent, {
      width: '70%'
    });
    dialogRef.afterClosed().subscribe(data => {

      console.log('Child component\'s event was triggered', data);
      this.secondFormGroup.get('lat').setValue(data.latitude);
      this.secondFormGroup.get('lng').setValue(data.longitude);
      this.secondFormGroup.get('address').setValue(data.address);
    });
  }
  get fc() {
    return this.secondFormGroup.controls;
  }
  nextstep() {
    this.secondFormGroup.value.images=this.ImageUrl
    if(this.secondFormGroup.value.adCategory==3){
      this.secondFormGroup.controls["address"].clearValidators();
      this.secondFormGroup.controls["address"].updateValueAndValidity();
     }
     
        if (this.secondFormGroup.valid) {
          if(this.secondFormGroup.value.adCategory==3){
            this.secondFormGroup.value.address="";
            this.secondFormGroup.value.lat=10.0;
            this.secondFormGroup.value.lan=10.0;
          }
      debugger
      this.secondFormGroup.removeControl('countryId');
  
      this.secondFormGroup.value.price=Number((this.secondFormGroup.value.price)?this.secondFormGroup.value.price.trim().replace(",","."):0) ;

      this.EditAdvertisementCommand = this.secondFormGroup.value;
      this.EditAdvertisementCommand.id = this.id;

      if (this.secondFormGroup.value.lng === null || this.secondFormGroup.value.lng === "0")
        this.EditAdvertisementCommand.lng = this.longitude;
      if (this.secondFormGroup.value.lat === null || this.secondFormGroup.value.lat === "0")
        this.EditAdvertisementCommand.lat = this.latitude;
      
         if( this.secondFormGroup.value.isAuction==true||this.secondFormGroup.value.isAuction==null){
          this.secondFormGroup.value.isAuction=true;
          this.secondFormGroup.value.auctionDays=0;
         }
         else{
          this.secondFormGroup.value.isAuction=false
         }
      this.AdvertisementService.editAdvertisement(this.EditAdvertisementCommand).subscribe(
        res => {
          if (res !== null) {
            this._snackBar.open("تم الاضافة بنجاح", "اضافة", {
              duration: 2220,

            });
            // this.router.navigateByUrl('/');
            this.router.navigateByUrl(
              '/ads/UserServices'
            );
            // let adsData = {
            //   secondFormGroup: this.secondFormGroup.value
            // }
            // this.next.emit(adsData);

          }
          else {
            this._snackBar.open("حدث خطأ عند الاضافة", "الاضافة", {
              duration: 2220,

            });
          }

        })


    }
  }
}