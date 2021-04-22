import { Injectable } from '@angular/core';
import { User } from './app-user';
import { UserToken } from './app-user-token';
import { MessagingService } from 'service/messaging.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSessionName = 'ipmats-currentUser';
  private userTokenSessionName = 'ipmats-currentUserToken';

  constructor(private MessagingService: MessagingService,
  ) { }
  public currentUser(): User {
    return this.getUser();
  }

  public get currentUserToken(): string {
    return this.getUserToken();
  }

  public get userLogedIn(): boolean {
    if (this.getUser() != null) {
      return true;
    } else {
      return false;
    }
  }

  login(
    loginUserId: number,
    loginFirstName: string,
    loginLastName: string,
    loginImageUrl: string,
    loginUserType: string,
    loginUserTypeId: number,
    loginPostOfficeName: string,
    loginPostOfficeId: number,
    loginToken: string,
    govId: number
  ) {
    const user: User = {
      userId: loginUserId,
      firstName: loginFirstName,
      lastName: loginLastName,
      imageUrl: loginImageUrl,
      userType: loginUserType,
      userTypeId: loginUserTypeId,
      postOfficeName: loginPostOfficeName,
      postOfficeId: loginPostOfficeId,
      governorateId: govId
    };

    const token: UserToken = { token: loginToken };

    localStorage.setItem(this.userSessionName, JSON.stringify(user));
    localStorage.setItem(this.userTokenSessionName, JSON.stringify(token));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.userSessionName);
    localStorage.removeItem(this.userTokenSessionName);
    
    this.MessagingService.deleteToken();
    localStorage.removeItem('fcm_web_token');
  }

  private getUser(): User {
    const userStorage = JSON.parse(localStorage.getItem(this.userSessionName));
    let userObj: User = null;
    if (userStorage !== null && userStorage !== undefined) {
      userObj = (userStorage as unknown) as User;
    }

    return userObj;
  }

  private getUserToken(): string {
    let token = '';
    const userStorage = JSON.parse(
      localStorage.getItem(this.userTokenSessionName)
    );
    let userObj: UserToken = null;
    if (userStorage !== null && userStorage !== undefined) {
      userObj = (userStorage as unknown) as UserToken;
      token = userObj.token;
    }

    return token;
  }
}
