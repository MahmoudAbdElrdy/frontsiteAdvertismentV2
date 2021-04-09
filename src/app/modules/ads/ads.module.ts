import { NgModule, LOCALE_ID,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { registerLocaleData } from "@angular/common";
import { AdsComponent } from './ads.component';
import { AdsRouteModule } from './ads-router.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ThemeModule } from 'src/app/theme/theme.module';
import { ListAdsComponent } from './listads/listads.component';
import { CoreModule, createTranslateLoader } from 'src/app/@core/core.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MatTableModule, MatPaginatorModule, MatIconModule, MatSortModule, MatCheckboxModule, MatDialogModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatListModule, MatButtonToggleModule,
  MatRadioModule,
  MatSnackBarModule, MAT_DATE_LOCALE, MatTooltipModule, MatAutocompleteModule, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

import { LightboxModule } from 'ngx-lightbox';
import localeAr from "@angular/common/locales/ar-EG";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AdsDetailsComponent } from './adsDetails/adsDetails.component';

import { NgxGalleryModule } from 'ngx-gallery';
import { ReportAdsComponent } from './report-ads/report-ads.component';
import { SendRequestComponent } from './send-request/send-request.component';
import { GoToLocationComponent } from './go-to-location/go-to-location.component';
import { RateAdsComponent } from './rate-ads/rate-ads.component';
import { ServiceProviderRequestComponent } from './service-provider-request/service-provider-request.component';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AddLocationComponent } from './add-ads/add-location/add-location.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { AddAdsStp1Component } from './add-ads/add-ads-stp1/add-ads-stp1.component';
import { AddAdsStp2Component } from './add-ads/add-ads-stp2/add-ads-stp2.component';
import { AdComplaintServiceProxy, AdvertisementServiceProxy, AuthServiceProxy, CitiesServiceProxy, CountriesServiceProxy, RegionManagementServiceProxy, ServiceProxy, UserManagementServiceProxy, UsersServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { OsmSingleViewComponent } from 'src/app/shared/osm-single-view/osm-single-view.component';
import { MapSingleViewComponent } from 'src/app/shared/map-single-view/map-single-view.component';
import{MapModalComponent} from 'src/app/shared/map-modal/map-modal.component'
import { GeoLocationService } from 'src/app/shared/services/geo-location.service';
import { from } from 'rxjs';
import { EditAdsComponent } from './edit-ads/edit-ads.component';
import { BarRatingModule } from 'ngx-bar-rating';


registerLocaleData(localeAr);

const MAT_COMPONENTS = [MatSnackBarModule];

@NgModule({
  declarations: [
    AdsComponent,
    ListAdsComponent,
    AdsDetailsComponent,
    ReportAdsComponent,
    SendRequestComponent,
    GoToLocationComponent,
    RateAdsComponent,
    ServiceProviderRequestComponent,
    AddAdsComponent,
    AddLocationComponent,
    UserServicesComponent,
    AddAdsStp1Component,
    AddAdsStp2Component,OsmSingleViewComponent,MapSingleViewComponent,MapModalComponent, EditAdsComponent
  ],
  imports: [MatAutocompleteModule,
    CommonModule,
    AdsRouteModule,
    CoreModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatCheckboxModule,
    MatCardModule,
    ThemeModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,MatSnackBarModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader, // exported factory function needed for AoT compilation
        deps: [HttpClient],
      },
      isolate: false,
    }),
    MatListModule,
    MatExpansionModule,
    MatStepperModule,
    LightboxModule,
    MatButtonToggleModule,
    MatRadioModule,
    NgxSliderModule,
    NgxGalleryModule,BarRatingModule
  ],
  providers: [
    RegionManagementServiceProxy,CountriesServiceProxy,ServiceProxy,AdComplaintServiceProxy,
    CitiesServiceProxy,AdvertisementServiceProxy,UsersServiceProxy,AuthServiceProxy,UserManagementServiceProxy,
    MatDatepickerModule,GeoLocationService,
    { provide: LOCALE_ID, useValue: 'ar-EG' },
    { provide: MAT_DATE_LOCALE, useValue: 'ar-EG' },
    { provide: MatDialogRef, useValue: {} },
{ provide: MAT_DIALOG_DATA, useValue: [] },
  ], 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [],
  entryComponents: [ReportAdsComponent, RateAdsComponent, GoToLocationComponent, AddLocationComponent,MapSingleViewComponent,MapModalComponent],
})
export class AdsModule { }
