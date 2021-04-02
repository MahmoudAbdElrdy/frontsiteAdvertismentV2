import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SwPush } from '@angular/service-worker';
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

  readonly VAPID_PUBLIC_KEY = "BP_iWY6SV-8gYIJme3fIvZhuhMgWRF7W5lPUTi_D7VUc1gV34YsRa4d2Zks4wwS12UvguZEa1M1Ujui_FIc6WoA";
  constructor(private router: Router,
    private swPush: SwPush) {
    
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  this.subscribeToNotifications();
  }
  subscribeToNotifications() {
    debugger
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub =>
      {
        debugger 
        console.log(sub);        
      }
      //this.newsletterService.addPushSubscriber(sub).subscribe()
    ).catch(err => console.error("Could not subscribe to notifications", err));
}
}
