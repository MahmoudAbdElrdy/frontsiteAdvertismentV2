import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
//import { SwPush } from '@angular/service-worker';
import { MessagingService } from 'service/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E3lany | إعلاني';
  configLoaded = null;

  readonly VAPID_PUBLIC_KEY = "BAQo9ciFQyqrXmYFQ2nC1WM9PEcU6JC0P8uwJzPf1g2nquD8G5Fl3DI1SSpiasIRafpbrt88QwwpSZSGzXYvsRs";
  message: any;
  constructor(private router: Router
    ) {
    
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
 // this.subscribeToNotifications();

  }
  subscribeToNotifications() {
    debugger
    // this.swPush.requestSubscription({
    //     serverPublicKey: this.VAPID_PUBLIC_KEY
    // })
    // .then(sub =>
    //   {
    //     debugger 
    //     console.log(sub);        
    //   }
    //   //this.newsletterService.addPushSubscriber(sub).subscribe()
    // ).catch(err => console.error("Could not subscribe to notifications", err));
}
}
