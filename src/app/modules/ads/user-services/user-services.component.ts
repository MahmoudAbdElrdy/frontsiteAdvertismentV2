import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { GeoLocationService } from 'src/app/shared/services/geo-location.service';
import { AdvertisementServiceProxy,ServiceProxy, CitiesServiceProxy, CountriesServiceProxy, CreateAdvertisementCommand, RegionManagementServiceProxy, GetServiceTypeListCommand, AddPaidServicesCommand, PaidServicesDto } from 'src/shared/service-proxies/service-proxies';
export class Services{
  Price:any;
  ServiceTypeId:any;
  Index:any;
}
@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.scss']
})


export class UserServicesComponent extends BaseComponent implements OnInit {
  isSelected: boolean = false;
  userServices = [
 
  ]
  services :any;
  userServicesForm: FormGroup;
  ServicesDto: Services[]=[];
  paid: PaidServicesDto[]=[];
  AddPaidServicesCommand:AddPaidServicesCommand={} as AddPaidServicesCommand;
  constructor(private formBuilder: FormBuilder, private url: Router, private activatedRoute: ActivatedRoute
   , private _formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private CitiesService :CitiesServiceProxy,
    private Service : RegionManagementServiceProxy, private ServiceProxy:  ServiceProxy,
    private AdvertisementService:AdvertisementServiceProxy,private _snackBar: MatSnackBar,
    ) {
    super();
  }
  submitted = false;
  GetServiceTypeListCommand:GetServiceTypeListCommand={} as GetServiceTypeListCommand;

  ngOnInit() {
    this.builduserServicesForm();
    this.LoadServiceTypeList();
   
  }
  LoadServiceTypeList(){

    return this.ServiceProxy.getServiceTypesList(this.GetServiceTypeListCommand).subscribe(res=>{
      this.services=res;
      this.services = res.map((val) => { return { name: val.name.ar, ServiceTypeId: val.id,Price:null,Checked: false }; });
     console.log(this.services)
    }) 
  }
 
 builduserServicesForm() {
    this.userServicesForm = this.formBuilder.group({});
  }
 
  submituserServices() {
    debugger;
   
   var array=this.services.filter(x=>x.Checked==true);
   this.paid = array.map(function(obj) {
    return {ServiceTypeId: obj.ServiceTypeId, Price: obj.Price}
    } )
    this.AddPaidServicesCommand.paidServices=this.paid;
    this.AdvertisementService.addPaidService(this.AddPaidServicesCommand).subscribe( 
      res=>{
      if(res)
      {
        this._snackBar.open("تم الاضافة بنجاح","اضافة" ,{
          duration: 2220,
          
        });
       // this.router.navigateByUrl('/');
       this.url.navigateByUrl(
        '/account/my-ads'
      );
       
      
      }
      else
      {
        this._snackBar.open("حدث خطأ عند الاضافة","الاضافة" ,{
          duration: 2220,
          
        });
      }
   
    })
  
    //console.log(edata)
    this.submitted = true;
  }

}
