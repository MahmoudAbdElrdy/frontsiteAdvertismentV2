import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-back',
  templateUrl: './login-back.component.html',
  styleUrls: ['./login-back.component.scss']
})
export class LoginBackComponent implements OnInit {

  constructor(private http : HttpClient ,private oauthService: OAuthService , private router :Router ) { }

  ngOnInit() {
    const jsonFile = `assets/settings/app.config.json`;
    this.http.get(jsonFile).subscribe((value: any) => {
      var configJson = JSON.parse(JSON.stringify(value.AuthConfig));
      var config = {
        issuer: configJson.issuer,
        redirectUri: configJson.redirectUri,
        postLogoutRedirectUri:configJson.postLogoutRedirectUri,
        clientId: configJson.clientId,
        responseType: configJson.responseType,
        scope: configJson.scope,
        showDebugInformation: configJson.showDebugInformation,
        dummyClientSecret: configJson.dummyClientSecret,
        timeoutFactor: configJson.timeoutFactor,
        clearHashAfterLogin: configJson.clearHashAfterLogin,
        skipIssuerCheck: configJson.skipIssuerCheck,
      } as AuthConfig;

      this.oauthService.configure(config);
      this.oauthService.loadDiscoveryDocumentAndLogin();
      this.oauthService.setupAutomaticSilentRefresh();
      this.oauthService.events.pipe(filter((e) => e.type === 'token_received')).subscribe((_) => {
        localStorage.setItem('token', this.oauthService.getAccessToken());
        this.router.navigateByUrl('/site');
      });
      this.oauthService.events.pipe(filter((e) => e.type === 'discovery_document_loaded')).subscribe((_) => {
       setTimeout(() => {
        this.router.navigateByUrl('/site');
       }, 1000);
    
      });
    });
}

}
