import { Component, OnInit, NgModule, AfterViewInit } from '@angular/core';
import { LanguageHandler } from 'src/app/@core/language/lanugage-handler';
import { LanguageModel } from 'src/app/@AppService/models/language.model';
import { HttpClient } from "@angular/common/http";
import { OAuthService, AuthConfig, OAuthErrorEvent } from "angular-oauth2-oidc";
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})



export class NavBarComponent implements OnInit {
  isAuthenticated;
  //  accessToken ;
  issueUrl;
  today = new Date();
  languageList: LanguageModel[] = [];
  selectedLang: LanguageModel

  selectedLangen: LanguageModel = {
    languageName: 'Engilsh',
    languageId: 0,
    languageAliase: 'en',
    isDefault: false,
    isRTL: false,
  };
  selectedLangar: LanguageModel = {
    languageName: 'عربي',
    languageId: 1,
    languageAliase: 'ar',
    isDefault: true,
    isRTL: true,
  };

  countries = [
    {
      id: 1,
      name: 'السعودية'
    },
    {
      id: 2,
      name: 'الإمارات'
    },
    {
      id: 3,
      name: 'البحرين'
    },
    {
      id: 4,
      name: 'الكويت'
    }
  ];
  cities = [
    {
      id: 1,
      countryId: 1,
      name: 'الرياض'
    },
    {
      id: 2,
      countryId: 1,
      name: 'جدة'
    },
    {
      id: 3,
      countryId: 1,
      name: 'الدمام'
    },
    {
      id: 4,
      countryId: 1,
      name: 'الخُبر'
    }
  ];
  selectedCountry = 1;
  selectedCity = 1;

  constructor(
    private oauthService: OAuthService, 
    public language: LanguageHandler, 
    private http: HttpClient, 
    private router: Router,
    public dialog: MatDialog
    ) { }
  ngOnInit() {
   ;
    this.languageList.push(this.selectedLangen);
    this.languageList.push(this.selectedLangar);
    this.language.Setlanguage(this.selectedLangar);
    setTimeout(() => {
      this.isAuthenticated = localStorage.getItem("isAuthenticated");
      // this.accessToken =  this.oauthService.getAccessToken();
     
      if (this.isAuthenticated) {
     
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    }, 200);

  }

  setSelectedLang(lang: LanguageModel) {
    this.selectedLang = lang;
    this.language.Setlanguage(this.selectedLang);
    //this.languageChange.changeLanguage(lang.languageId);
    // window.location.reload();
  }

  logout() {
    this.oauthService.logOut();
    localStorage.clear();

  }
  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
