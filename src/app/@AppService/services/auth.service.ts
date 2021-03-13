import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from './Base/GenericService';
import { ServiceUrls } from '../Common/ServiceUrls';
import { UserPages } from '../../@core/auth/app-user-pages';
import { ConfigurationService } from 'src/app/@core/settings/Configuration.Service';
import { LoginUser, LoginResponse, UserViewAction } from '../models/auth.model';
import { ResponseDto, BaseResult } from '../models/common.model';
import { UpdatedUserDataDto } from 'src/app/@core/auth/user-updated-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private configuration$: Configuration;
  constructor(
    private generalService: GenericService,
    private config: ConfigurationService
  ) {
    this.configuration$ = this.config.settings;
  }

  login(loginUser: LoginUser): Observable<ResponseDto<LoginResponse>> {
    return this.generalService.getData<ResponseDto<LoginResponse>>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.LoginUrl,
      loginUser
    );
  }

  logOut(): Observable<boolean> {
    return this.generalService.getData<boolean>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.LogOutUrl,
      ''
    );
  }

  resetPassword(password: string, vCode: string, email: string) {
    return this.generalService.getData<BaseResult>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.ResetPassword,
      {
        Mail: email,
        Code: vCode,
        Password: password,
      }
    );
  }

  getUserMenu() {
    return this.generalService.getData<UserPages[]>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.GetCurrentUserViews,
      new Object()
    );
  }

  getUserUpdatedData() {
    return this.generalService.getData<ResponseDto<UpdatedUserDataDto>>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.GetUpdatedUserData,
      new Object()
    );
  }

  getUserViewActionList(viewId: number) {
    const viewActionRequest: UserViewAction = { pageId: viewId };

    return this.generalService.getData<number[]>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.GetUserViewActionList,
      viewActionRequest
    );
  }

  forgetPassword(userMail: string) {
    return this.generalService.updateData<ResponseDto<BaseResult>>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.ForgetPassword,
      { UserEmail: userMail }
    );
  }

  verifyUser(email: string, vCode: string) {
    return this.generalService.updateData<ResponseDto<BaseResult>>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.VerifyUserUrl,
      { Mail: email, Code: vCode }
    );
  }
}
