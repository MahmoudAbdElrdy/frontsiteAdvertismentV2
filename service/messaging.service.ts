import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { SetTokenCommand, UsersServiceProxy } from 'src/shared/service-proxies/service-proxies';
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging, private userService: UsersServiceProxy) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }
  requestPermission() {
    debugger
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        var fcm_web_token = localStorage.getItem('fcm_web_token');
        if (fcm_web_token == undefined) {
          localStorage.setItem('fcm_web_token', token);
        } else {
          if (fcm_web_token != token && localStorage.getItem("isLoggedin") == "true") {
            
          }
          var command: SetTokenCommand = new SetTokenCommand();
            command.webToken = token;
            this.userService.setToken(command).subscribe(t=>{
              debugger
            });
        }
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }
  deleteToken() {
    var fcm_web_token = localStorage.getItem('fcm_web_token');
    this.angularFireMessaging.deleteToken(fcm_web_token).subscribe(
      (payload) => {
        console.log("delete token");
        this.currentMessage.next(payload);
      })
  }
}