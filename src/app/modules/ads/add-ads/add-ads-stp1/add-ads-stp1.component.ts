import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { GeoLocationService } from 'src/app/shared/services/geo-location.service';
import { AppConsts } from 'src/AppConsts';
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
  BaseFile: any;
  @Output() next = new EventEmitter<any>();
  AddCommercialRecordCommand:AddCommercialRecordCommand={} as AddCommercialRecordCommand;
  IsUserHasCommercialRecordCommand:IsUserHasCommercialRecordCommand=new IsUserHasCommercialRecordCommand()
  constructor(  private _formBuilder: FormBuilder, private http: HttpClient,
    public dialog: MatDialog,
    private router : Router,
    private CitiesService :CitiesServiceProxy,
    private Service : RegionManagementServiceProxy, private ServiceProxy:  ServiceProxy,private Autuser:AuthServiceProxy,
    private AdvertisementService:AdvertisementServiceProxy,private _snackBar: MatSnackBar,private Location:GeoLocationService
){
   // super();
  }

  ngOnInit() {
    this.BaseFile=AppConsts.baseUrlImage;
    this.firstFormGroup = this._formBuilder.group({
      images: [''],
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
    else
    {
      // this._snackBar.open(" يجب اضافة السجل لاستكمال الاعلان","الاضافة",{
      //   duration: 2220,
        
      // });
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
    this.ImageUrl.splice(e, 1);
  }
  UploadImage2(formData){
 
    return  this.http.post(AppConsts.baseUrl + '/api/UploadFile/FileUpload', formData);
     
  }
  getFileExtension3(filename) {
debugger
    return filename.split('.').pop();
  }
  ImageUrl: any;
  fileToUpload = null;
  file2: File[];
  uploadImage(event) 
{
debugger
 this.file2 = event.target.files;
 
  const formData = new FormData();
 for (let index = 0; index < this.file2.length; index++) {
  if(this.getFileExtension3(this.file2[index].name.toUpperCase())=="PNG"||this.getFileExtension3(this.file2[index].name.toUpperCase())=="JPG"||this.getFileExtension3(this.file2[index].name.toUpperCase())=="JPEG"||this.getFileExtension3(this.file2[index].name.toUpperCase())=="BMP"||this.getFileExtension3(this.file2[index].name.toUpperCase())=="GIF")

   formData.append('files', this.file2[index]);
   else{
     this._snackBar.open(" هناك خط في امتداد الصورة او الملف","الاضافة",{
        duration: 2220,
        
      });
   }
}
  this.UploadImage2(formData).subscribe(event => {
debugger
 const result= event as any;
console.log(result)
if(this.ImageUrl==undefined||this.ImageUrl==null){
  this.ImageUrl=result.filePaths;
}
else
{
  this.ImageUrl.push.apply(this.ImageUrl,result.filePaths)

}

  }
  );
} 
  saveData(){
   debugger
    let formArray = this.firstFormGroup.controls['images'] as FormArray;
    //formArray.patchValue(this.imageInfo.map(x=>x.imageUrl));
    formArray.patchValue(this.ImageUrl);
  //  this.AddCommercialRecordCommand.images=formArray.value;
    if(this.firstFormGroup.valid){
      this.AdvertisementService.addCommercialRecord(this.firstFormGroup.value).subscribe( 
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
    else
    {
      this._snackBar.open(" يجب اضافة السجل لاستكمال الاعلان","الاضافة",{
        duration: 2220,
        
      });
    } 
    
    
  }
}