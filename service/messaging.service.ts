import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        var fcm_web_token = localStorage.getItem('fcm_web_token');
        if (fcm_web_token == undefined) {
          localStorage.setItem('fcm_web_token', token);       
        } else {
          if (fcm_web_token != token) {           
          }
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