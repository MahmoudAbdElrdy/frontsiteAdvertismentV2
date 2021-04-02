import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { AdComplaintServiceProxy, AdvertisementServiceProxy,SpaceInfoDto, CreateAdComplaintCommand } from 'src/shared/service-proxies/service-proxies';


@Component({
  selector: 'app-report-ads',
  templateUrl: './report-ads.component.html',
  styleUrls: ['./report-ads.component.scss']
})
export class ReportAdsComponent extends BaseComponent implements OnInit {
  reportAdsForm: FormGroup;
  AdID: any;
  AdvertisementDetailDto: SpaceInfoDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private Service: AdComplaintServiceProxy,
    private ServiceAdvertisement: AdvertisementServiceProxy,

    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ReportAdsComponent>,
    private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(parm => {
      
       this.AdID = parm['id'];
       this.ServiceAdvertisement.getAdvertisementDetail(this.AdID).subscribe(
        (result) => {
          console.log(result);
          this.AdvertisementDetailDto = result;
          if (result != null || result != undefined) {
            //  this.AdDto=result.a;
            var galleryImage = result.images;
          }
        },
        (err) => {
          this.errorOccured(err);
        }
      );
    });
    this.buildForm();
  }
  get fc() {
    return this.reportAdsForm.controls;
  }
  //build Form
  buildForm() {
    this.reportAdsForm = this.formBuilder.group({
      reportReason: ['', Validators.required]
    });
  }
  //submit
  submitReportAdsForm() {
    var add: CreateAdComplaintCommand = new CreateAdComplaintCommand();
    add.complaintReason = this.reportAdsForm.controls['reportReason'].value;
    add.clientId = localStorage.getItem('user_Id');
    add.adId = this.AdID;
    this.Service.addAdComplaint(add).subscribe(res => {
      if (res !== null) {
        this.showMessageWithType(0, "تم الابلاغ بنجاح");
        ;
        this._snackBar.open("تم الابلاغ بنجاح", " تبليغ عن اعلان", {
          duration: 2220,
        });
        this.dialogRef.close();
      }
      else {
        this._snackBar.open("حدث خطأ عند التعديل", "تعديل", {
          duration: 2220,
        });
      }
      this.dialogRef.close();
    });
  }
}
