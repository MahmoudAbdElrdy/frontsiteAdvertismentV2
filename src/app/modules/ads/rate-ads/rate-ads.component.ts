import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'igniteui-angular-core';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { AddRatingCommand, AdvertisementServiceProxy, RatingDto } from 'src/shared/service-proxies/service-proxies';

@Component({
  selector: 'app-rate-ads',
  templateUrl: './rate-ads.component.html',
  styleUrls: ['./rate-ads.component.scss']
})

export class RateAdsComponent extends BaseComponent implements OnInit {
  rateAdsForm: FormGroup;
  RatingDto: AddRatingCommand;
  constructor(private formBuilder: FormBuilder,
   public dialog: MatDialog, private _snackBar: MatSnackBar,
    private route: Router, private AdvertisementService: AdvertisementServiceProxy,
    private activatedRoute: ActivatedRoute,) {
    super();
    this.RatingDto = new AddRatingCommand
  }

  ngOnInit() {
    this.buildForm();

  }
  get fc() {
    return this.rateAdsForm.controls;
  }
  //build Form
  buildForm() {
    this.rateAdsForm = this.formBuilder.group({
      star: new FormControl(0),
      yourComment: ['',Validators.required]
    });
  }


  //submit
  submitrateAdsForm() {
    debugger
    let adId= this.activatedRoute.snapshot.queryParams["id"];
    this.RatingDto.adId=adId;
    this.RatingDto.ratingText=this.rateAdsForm.value['yourComment'];
    this.RatingDto.ratingValue=parseFloat(this.rateAdsForm.value['star']);
    if (this.rateAdsForm.valid){
      this.AdvertisementService.addRating(this.RatingDto).subscribe(
        res => {
          if (res !== null) {
            this._snackBar.open("تم الاضافة بنجاح", "اضافة", {
              duration: 2220,
  
            });
  
           this.dialog.closeAll();
          }
          else {
            this._snackBar.open("حدث خطأ عند الاضافة", "الاضافة", {
              duration: 2220,
  
            });
          }
  
        })
      console.log(this.rateAdsForm.value)
      console.log('in progress');
    }
  
  }
}
