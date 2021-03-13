import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe  } from '@angular/common';
import { registerLocaleData } from "@angular/common";
import { PagesComponent } from './pages.component';
import { PagesRouteModule } from './pages-router.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ThemeModule } from 'src/app/theme/theme.module';
import { IndexComponent } from './home/index/index.component';
import { CoreModule, createTranslateLoader } from 'src/app/@core/core.module';
import { ContactComponent } from './contact/contact.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { 
  MatTableModule, MatPaginatorModule, MatIconModule, MatSortModule, MatCheckboxModule, MatDialogModule, MatSelectModule, 
  MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatListModule, MatExpansionModule, MatButtonToggleModule, 
  MatRadioModule, 
  MatSnackBarModule, MAT_DATE_LOCALE, MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

import { LightboxModule } from 'ngx-lightbox';
import localeAr from "@angular/common/locales/ar-EG";
import { UsingInstructionsComponent } from './usinginstructions/usinginstructions.component';
import { PrivacyPolicyComponent } from './privacypolicy/privacypolicy.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AdvertisementServiceProxy } from 'src/shared/service-proxies/service-proxies';

registerLocaleData(localeAr);

const MAT_COMPONENTS = [MatSnackBarModule];

@NgModule({
  declarations: [
    PagesComponent, 
    IndexComponent, 
    ContactComponent,
    UsingInstructionsComponent,
    PrivacyPolicyComponent,
    //RegisterComponent
  ],
  imports: [
    CommonModule,
    PagesRouteModule,
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
    NgxMatNativeDateModule,
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
    LightboxModule,
    MatButtonToggleModule,
    MatRadioModule
  ],
  providers: [
    MatDatepickerModule,AdvertisementServiceProxy,
    {provide: LOCALE_ID, useValue: 'ar-EG'},
    {provide: MAT_DATE_LOCALE, useValue: 'ar-EG'},
]
})
export class PagesModule { }
