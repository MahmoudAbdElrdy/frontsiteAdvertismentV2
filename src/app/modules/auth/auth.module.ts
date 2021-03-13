import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { registerLocaleData } from "@angular/common";
import { LoginBackComponent } from './login-back/login-back.component';
import { AuthComponent } from './auth.component';
import { AuthRouteModule } from './auth-router.module';
import { CoreModule, createTranslateLoader } from 'src/app/@core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ThemeModule } from 'src/app/theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {
  MatIconModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatSnackBarModule,
  MAT_DATE_LOCALE
} from '@angular/material';

//import { LoginComponent } from './login/login.component';
//import { RegisterComponent } from './register/register.component';
import localeAr from "@angular/common/locales/ar-EG";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { AuthServiceProxy } from 'src/shared/service-proxies/service-proxies';

registerLocaleData(localeAr);

const MAT_COMPONENTS = [MatSnackBarModule];
@NgModule({
  declarations: [
    AuthComponent,
    LoginBackComponent,
    //ForgetPasswordComponent,
    //LoginComponent,
    //RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRouteModule,
    CoreModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
    ThemeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDateModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader, // exported factory function needed for AoT compilation
        deps: [HttpClient],
      },
      isolate: false,
    }),
    MatButtonToggleModule,
    MatRadioModule,
    MatStepperModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: LOCALE_ID, useValue: 'ar-EG' },
    { provide: MAT_DATE_LOCALE, useValue: 'ar-EG' },
  ],
  entryComponents: [],
})
export class AuthModule { }
