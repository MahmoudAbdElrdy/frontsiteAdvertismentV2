import { Component, OnInit, NgModule, AfterViewInit } from '@angular/core';
import { LanguageHandler } from 'src/app/@core/language/lanugage-handler';
import { LanguageModel } from 'src/app/@AppService/models/language.model';
import { HttpClient } from "@angular/common/http";
import { OAuthService, AuthConfig, OAuthErrorEvent } from "angular-oauth2-oidc";
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { ViewChild, ViewEncapsulation } from '@angular/core';;
import { Options } from "@angular-slider/ngx-slider";
import { AdCategoryEnum, AdvertisementDtoPageList, AdvertisementServiceProxy, CitiesServiceProxy, RegionManagementServiceProxy,SearchAdvertisementCommand,ServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf,Subscription } from 'rxjs';
import { AppConsts } from 'src/AppConsts';
import { SearchService } from 'src/app/shared/search-service';
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
  searchProduct:any;
  countries = [
   
  ];
  cities = [
  ];
  selectedCountry = 1;
  selectedCity = 1;
  cityId:any;
  countryid: any;
  constructor(
    private oauthService: OAuthService, 
    public language: LanguageHandler, 
    private http: HttpClient, 
    private router: Router,
    private Service :AdvertisementServiceProxy,private _snackBar: MatSnackBar,
    private dialog: MatDialog,private CitiesService :CitiesServiceProxy,
    private ServiceRegion : RegionManagementServiceProxy, private ServiceProxy:  ServiceProxy,private SearchService:SearchService
    ) { 
      //this.searchProduct="";
      this.SearchService.SearchAdvertisementCommand.countryId=new Array<string>();
this.SearchService.SearchAdvertisementCommand.cityId=new Array<string>();
this.SearchService.SearchAdvertisementCommand.maxPrice=0;
this.SearchService.SearchAdvertisementCommand.minPrice=0;
this.SearchService.SearchAdvertisementCommand.adCategoryies=new Array<AdCategoryEnum>();
    }
  ngOnInit() {
  this.LoadCountries();
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
  SetValue(){
    debugger
    localStorage.setItem("searchProduct",this.searchProduct)
  }
  SetValuecityId(){
    debugger
    localStorage.setItem("selectedCity",this.cityId)
  }
  LoadCountries(){

    return this.ServiceRegion.countries(1,150,"","","").subscribe(res=>{
      this.countries=res.items;
      console.log(this.countries)
    })
   
    
  }
  ChangeCity(City) {
    debugger
   
 this.cityId=City;
   localStorage.setItem("CityId",City)
  }
  Change(countryid) {
    debugger
    this.countryid=countryid;
   this.Loadcities(countryid);
   localStorage.setItem("countryid",countryid)
  }
  Loadcities(countryId){

    return this.CitiesService.getCitiesByCountryId(countryId).subscribe(res=>{
      this.cities=res;
      console.log(this.cities)
    })
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
  search(){
    this.SearchService.SearchAdvertisementCommand.cityId.push(this.cityId);
    this.SearchService.SearchAdvertisementCommand.countryId.push(this.countryid);
    this.SearchService.SearchAdvertisementCommand.title=this.searchProduct;
  
      this.router.navigateByUrl(
        '/ads/list-ads' 
      );
    
  }
}
