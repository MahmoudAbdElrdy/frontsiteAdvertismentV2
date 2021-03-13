import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { OAuthService, AuthConfig } from "angular-oauth2-oidc";
// import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E3lany | إعلاني';
  configLoaded = null;

  // constructor(private oauthService: OAuthService, private http: HttpClient) {}
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });

  }
}
