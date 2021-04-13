import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { GeoLocationService } from 'src/app/shared/services/geo-location.service';
import { AdvertisementServiceProxy,ServiceProxy, CitiesServiceProxy, CountriesServiceProxy, CreateAdvertisementCommand, RegionManagementServiceProxy, GetServiceTypeListCommand } from 'src/shared/service-proxies/service-proxies';
import { AddLocationComponent } from '../add-location/add-location.component';

export interface ImageInfo {
  imageUrl: string;
  imageName: string;
  imageExtention: string;
  imageSize: string;
}

@Component({
  selector: 'app-add-ads-stp2',
  templateUrl: './add-ads-stp2.component.html',
  styleUrls: ['./add-ads-stp2.component.scss']
})
export class AddAdsStp2Component  implements OnInit {

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
  constructor(
    private _formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private router : Router,
    private CitiesService :CitiesServiceProxy,
    private Service : RegionManagementServiceProxy, private ServiceProxy:  ServiceProxy,
    private AdvertisementService:AdvertisementServiceProxy,private _snackBar: MatSnackBar,private Location:GeoLocationService
    ){
   // super();
  }
 
  ngOnInit() {
  
  this.LoadServiceTypeList();
    this.LoadCountries();
  
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
  
    var login=localStorage.getItem('isAuthenticated');
    if(login===undefined||login===null){
      {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '60%'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
    }
   
  }
  onCheckboxChange(e) {
    const checkArray: FormArray = this.secondFormGroup.get('FreeServiceIds') as FormArray;
  
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value ==e.source.value) {
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
          
          url = reader.result.toString();
     
        };



        if (this.imageInfo2.length < 4) {
          setTimeout(() => {
            ;
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
   
    if (this.secondFormGroup.valid) {
      ;
    
      this.secondFormGroup.removeControl('countryId');
      let formArray = this.secondFormGroup.controls['images'] as FormArray;
      formArray.patchValue(this.imageInfo2.map(x=>x.imageUrl));
      if(this.imageInfo2.length<0){
        
      }
     if( this.secondFormGroup.value.isAuction==true||this.secondFormGroup.value.isAuction==null){
      this.secondFormGroup.value.isAuction=0;
      this.secondFormGroup.value.auctionDays=0;
     }
     else{
      this.secondFormGroup.value.isAuction=1
     }
      this.AdvertisementService.addAdvertisement(this.secondFormGroup.value)
      .subscribe( 
        
      
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