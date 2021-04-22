import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { registerLocaleData } from "@angular/common";
import { AccountComponent } from './account.component';
import { AccountRouteModule } from './account-router.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ThemeModule } from 'src/app/theme/theme.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { CoreModule, createTranslateLoader } from 'src/app/@core/core.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MatTableModule, MatPaginatorModule, MatIconModule, MatSortModule, MatCheckboxModule, MatDialogModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatListModule, MatButtonToggleModule,
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
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { NgxGalleryModule } from 'ngx-gallery';
import { SubmitComplaintComponent } from './submit-complaint/submit-complaint.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { MyservicesComponent } from './my-services/my-services.component';
import { MyAccountSidebarComponent } from './my-account-sidebar/my-account-sidebar.component';
import { RequestsComponent } from './requests/requests.component';
import { ReceivedComplaintsComponent } from './received-complaints/received-complaints.component';
import { ReplyComplaintComponent } from './reply-complaint/reply-complaint.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdvertisementServiceProxy, NotificationServiceProxy, OrderComplaintServiceProxy, UsersServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { IntervalsComponent } from './intervals/intervals.component';
import { IntervalsInstallmentComponent } from './intervals-installment/intervals-installment.component';

registerLocaleData(localeAr);

const MAT_COMPONENTS = [MatSnackBarModule];

@NgModule({
  declarations: [
    AccountComponent,
    FavoritesComponent,
    SubmitComplaintComponent,
    ReplyComplaintComponent,
    NotificationsComponent,
    MyAdsComponent,
    MyservicesComponent,
    MyAccountSidebarComponent,
    RequestsComponent,
    ReceivedComplaintsComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    IntervalsComponent,
    IntervalsInstallmentComponent
  ],
  imports: [
    CommonModule,
    AccountRouteModule,
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
    MatRadioModule,
    NgxSliderModule,
    NgxGalleryModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: LOCALE_ID, useValue: 'ar-EG' },
    { provide: MAT_DATE_LOCALE, useValue: 'ar-EG' },
    AdvertisementServiceProxy,
    OrderComplaintServiceProxy,
    UsersServiceProxy,
    NotificationServiceProxy
  ],
  exports: [ChangePasswordComponent],
  entryComponents: [SubmitComplaintComponent, ReplyComplaintComponent,ChangePasswordComponent],
})
export class AccountModule { }
