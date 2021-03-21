import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import { BreadcrumbComponent } from './Layout/breadcrumb/breadcrumb.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { OneColumnComponent } from './one-column/one-column.component';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { translateLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from '../modules/auth/login/login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterComponent } from '../modules/auth/register/register.component';
import { ForgetPasswordComponent } from '../modules/auth/forget-password/forget-password.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AdvertisementServiceProxy, AuthServiceProxy, CitiesServiceProxy, CountriesServiceProxy, RegionManagementServiceProxy, ServiceProxy, UserManagementServiceProxy, UsersServiceProxy } from 'src/shared/service-proxies/service-proxies';

const COMPONENTS = [
  OneColumnComponent,
  LoginComponent,
  RegisterComponent,
  ForgetPasswordComponent
];

@NgModule({
  declarations: [NavBarComponent,BreadcrumbComponent, FooterComponent, OneColumnComponent, LoginComponent, RegisterComponent, ForgetPasswordComponent],
  imports: [
    MatCardModule,
    CommonModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatCheckboxModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory, // exported factory function needed for AoT compilation
        deps: [HttpClient],
      },
      isolate: false,
    }),
    RouterModule
  ],
  providers: [
    RegionManagementServiceProxy,CountriesServiceProxy,ServiceProxy,
    CitiesServiceProxy,AdvertisementServiceProxy,UsersServiceProxy,AuthServiceProxy,UserManagementServiceProxy,
  
  
  ], 
  exports: [CommonModule, ...COMPONENTS],
  entryComponents: [LoginComponent, RegisterComponent, ForgetPasswordComponent]
})
export class ThemeModule { }
