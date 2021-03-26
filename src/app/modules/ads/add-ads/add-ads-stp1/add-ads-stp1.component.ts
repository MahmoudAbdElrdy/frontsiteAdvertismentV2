import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { GeoLocationService } from 'src/app/shared/services/geo-location.service';
import { AdvertisementServiceProxy,ServiceProxy, CitiesServiceProxy, CountriesServiceProxy, CreateAdvertisementCommand, RegionManagementServiceProxy, GetServiceTypeListCommand, AddCommercialRecordCommand, AuthServiceProxy, IsUserHasCommercialRecordCommand } from 'src/shared/service-proxies/service-proxies';
import { AddLocationComponent } from '../add-location/add-location.component';


export interface ImageInfo {
  imageUrl: string;
  imageName: string;
  imageExtention: string;
  imageSize: string;
}

@Component({
  selector: 'app-add-ads-stp1',
  templateUrl: './add-ads-stp1.component.html',
  styleUrls: ['./add-ads-stp1.component.scss']
})
export class AddAdsStp1Component  implements OnInit {
  firstFormGroup: FormGroup; 
  file: File[];
  imageInfo: ImageInfo[] = [];

  @Output() next = new EventEmitter<any>();
  AddCommercialRecordCommand:AddCommercialRecordCommand={} as AddCommercialRecordCommand;
  IsUserHasCommercialRecordCommand:IsUserHasCommercialRecordCommand=new IsUserHasCommercialRecordCommand()
  constructor(  private _formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private router : Router,
    private CitiesService :CitiesServiceProxy,
    private Service : RegionManagementServiceProxy, private ServiceProxy:  ServiceProxy,private Autuser:AuthServiceProxy,
    private AdvertisementService:AdvertisementServiceProxy,private _snackBar: MatSnackBar,private Location:GeoLocationService
){
   // super();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      commercialRegisterAttachments: [''],
      File: [null],
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
    this.Check();
    // let adsStep1Data = {
    //   firstFormGroup: this.firstFormGroup.value
    // }

    // console.log(adsStep1Data);
    // this.next.emit(adsStep1Data);
  }

Check(){
  this.Autuser.isUserHasCommercialRecord(this.IsUserHasCommercialRecordCommand)
  .subscribe(res=>{
    if(res){
       let adsStep1Data = {
      firstFormGroup: this.firstFormGroup.value
    }

    console.log(adsStep1Data);
    this.next.emit(adsStep1Data);
    }
  })
}
  
  
  processDataFile(fileInput: any) {
    ;
    this.file = []
    this.file = fileInput.files;
    if (this.file !== null) {
      for (let index = 0; index < this.file.length; index++) {
        const element = this.file[index];
        const size = element.size / Math.log(1024);
        const reader = new FileReader();
        let url
        reader.readAsDataURL(element);
        reader.onload = () => {
          url = reader.result.toString();
        };



        if (this.imageInfo.length < 4) {
          setTimeout(() => {
            this.imageInfo.push({
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

  
  removeAttachments(e) {
    this.imageInfo.splice(e, 1);
  }

  saveData(){
    debugger;
    let formArray = this.firstFormGroup.controls['commercialRegisterAttachments'] as FormArray;
    formArray.patchValue(this.imageInfo.map(x=>x.imageUrl));

    this.AddCommercialRecordCommand.images=this.imageInfo.map(x=>x.imageUrl);
    if(this.AddCommercialRecordCommand.images.length>0){
      this.AdvertisementService.addCommercialRecord(this.AddCommercialRecordCommand).subscribe( 
        res=>{
        if(res!==null)
        {
          this._snackBar.open("تم الاضافة بنجاح","اضافة" ,{
            duration: 2220,
            
          });
         // this.router.navigateByUrl('/');
         let adsStep1Data = {
          firstFormGroup: this.firstFormGroup.value
        }
    
        console.log(adsStep1Data);
        this.next.emit(adsStep1Data);
        
        }
        else
        {
          this._snackBar.open("حدث خطأ عند الاضافة","الاضافة" ,{
            duration: 2220,
            
          });
        }
     
      })
    }
    else{
      let adsStep1Data = {
        firstFormGroup: this.firstFormGroup.value
      }
  
      console.log(adsStep1Data);
      this.next.emit(adsStep1Data);
    }
  
    
  }
}