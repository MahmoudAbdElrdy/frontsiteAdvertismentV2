import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { ModelServiceService } from 'src/app/shared/model-service.service';
import { AdvertisementServiceProxy, ApplyForAdvertisementCommand, GetServiceTypeListCommand, ServiceDto, ServiceProxy, ServiceTypeDto } from 'src/shared/service-proxies/service-proxies';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-service-provider-request',
  templateUrl: './service-provider-request.component.html',
  styleUrls: ['./service-provider-request.component.scss']
})

export class ServiceProviderRequestComponent extends BaseComponent implements OnInit {
  serviceProviderRequestForm: FormGroup;
  GetServiceTypeListCommand = new GetServiceTypeListCommand();
  services = [

  ];
  public fieldArray: Array<any> = [];
  private newAttribute: any = {};
  selectedService = 1;
  ServiceTypeList: ServiceTypeDto[];
  servicerProvider: ServiceDto[];
  triggerValue: any;
  provider: any;
  servicesId: any;
  providerId: any;
  ApplyForAdvertisementCommand: ApplyForAdvertisementCommand = new ApplyForAdvertisementCommand;
  constructor(private formBuilder: FormBuilder,
    private ServiceProxy: ServiceProxy, public dialog: MatDialog, private _snackBar: MatSnackBar,
    private route: Router, private AdvertisementService: AdvertisementServiceProxy,
    private activatedRoute: ActivatedRoute, private ModelServiceService: ModelServiceService) {
    super();
  }
  submitted = false;

  ngOnInit() {
    this.buildServiceProviderRequestForm();
    var login = localStorage.getItem('isAuthenticated');
    if (login === undefined || login === null) {
      {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '60%'
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
    }
    this.LoadServiceTypeList();
    this.ApplyForAdvertisementCommand = this.ModelServiceService.ApplyForAdvertisementCommand;
    console.log(this.ApplyForAdvertisementCommand);
  }

  LoadServiceTypeList() {

    return this.ServiceProxy.getRequestTypesList(this.GetServiceTypeListCommand).subscribe(res => {
      this.services = res;
      console.log(this.services)
    })
  }
  Change(id) {
    
    this.LoadservicerProvider(id.value);
    
    this.triggerValue = id.source.triggerValue;
    this.servicesId = id.value;
    console.log(id.source.triggerValue)
  }
  changeRadioValue(Provider) {
    
    this.provider = Provider.userName;
    this.providerId = Provider.id;
    console.log(this.serviceProviderRequestForm.get('provider').value);
  }
  addFieldValue() {
    debugger
    this.newAttribute.ProviderName = this.provider;
    this.newAttribute.ServiceName = this.triggerValue;
    this.newAttribute.ProviderName = this.provider;
    this.newAttribute.servicesId = this.providerId;
    if (this.newAttribute.ProviderName !== null && this.newAttribute.ProviderName !== undefined && this.newAttribute.ServiceName !== null && this.newAttribute.ServiceName !== undefined) {
      const found = this.fieldArray.some(el =>el.ServiceName==this.newAttribute.ServiceName);
      if (!found) 
      { 
        this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
      }
      else
      { this._snackBar.open("???? ?????????????? ???? ??????", "", {
        duration: 2220,

      });

      }
         // this.fieldArray.push(this.newAttribute)
         
        
     
    }

    console.log(this.fieldArray);
  }
  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  LoadservicerProvider(id) {

    return this.ServiceProxy.getServicesListByTypeId(id).subscribe(res => {
      
      this.servicerProvider = res;
      console.log(this.servicerProvider)
    })


  }
  buildServiceProviderRequestForm() {
    this.serviceProviderRequestForm = this.formBuilder.group({
      services: ['', Validators.required],
      provider: [''],
    }
    );
  }

  submitServiceProviderRequest() {
    
    this.ApplyForAdvertisementCommand = this.ModelServiceService.ApplyForAdvertisementCommand;
    this.ApplyForAdvertisementCommand.servicesIds = this.fieldArray.map(x => x.servicesId);
    this.AdvertisementService.applyForAdvertisement(this.ApplyForAdvertisementCommand).subscribe(
      res => {
        if (res !== null) {
          this._snackBar.open("???? ?????????????? ??????????", "??????????", {
            duration: 2220,

          });

          this.route.navigateByUrl('/account/requests');
        }
        else {
          this._snackBar.open("?????? ?????? ?????? ??????????????", "??????????????", {
            duration: 2220,

          });
        }

      })
    //this.submitted = true;
  }
  dohome(){
 
    this.route.navigateByUrl('/pages/home');
   
  }
}
