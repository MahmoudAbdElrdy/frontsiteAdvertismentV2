import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AppConfigService } from './shared/AppConfigService';
import { JwtInterceptor } from './@core/Interceptor/jwt.interceptor';
import { ConfigurationService } from './@core/settings/Configuration.Service';
import { ErrorInterceptor } from './@core/Interceptor/error.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule, createTranslateLoader } from './@core/core.module';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatIconModule,
  MatSortModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatPaginatorIntl,
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material';
import { PageChangingEvent } from './@core/events/page-change-event';
import { LanguageChangingEvent } from './@core/events/language-change-event';
import { getArabicPaginatorIntl } from './shared/arabic-paginator-intl';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthGuard } from './shared/AuthGuard';
import { AppConsts } from 'src/AppConsts';
import { API_BASE_URL, AuthServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { InterceptService } from 'src/app/_helpers/intercept.service';
import { ModelServiceService } from './shared/model-service.service';
import { SearchService } from './shared/search-service';
export function getApiBaseUrl(): string {
  return AppConfigService.appConfig.MobileBaseURL;
}
export function getBaseUrl(): string {
  return AppConsts.baseUrl;
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    CoreModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
      },
    }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [AuthServiceProxy,ModelServiceService,SearchService,
    TranslateService,
    HttpClientModule,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => {
        return () => {
          return configService.load();
        };
      },
    },
    
    //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
        useClass: InterceptService,
      multi: true
    },
    { provide: API_BASE_URL, useFactory: getBaseUrl },
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: MatPaginatorIntl, useValue: getArabicPaginatorIntl() },
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private translate: TranslateService
  ) {
    // translate.addLangs([this.localization.Engulish, this.localization.Arabic]);
    const browserLang = translate.getBrowserLang();
    // translate.use(this.localization.Arabic);
  }
}


export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(
    httpClient,
    document.baseURI+'/assets/i18n/',
    '.json'
  );
  }