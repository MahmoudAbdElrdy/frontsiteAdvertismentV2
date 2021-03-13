import { GenericService } from './Base/GenericService';
import { Injectable } from '@angular/core';
import { ServiceUrls } from '../Common/ServiceUrls';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/@core/settings/Configuration.Service';
import {
  ResponseDto,
  PageList,
  BaseResult,
  DeleteRequestDto,
  DropDownListDto,
} from '../models/common.model';
import {
  UserSearchModel,
  UserModel,
  UserAddEditDto,
  UserIdentityDto,
  UserProfileData,
  UpdateProfileDto,
  UserLocationDto,
  SearchCourierDto,
} from '../models/user.model';
import { PageMode } from '../Enums/security';
import { SystemViewModel } from '../models/system.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private configuration$: Configuration;
  constructor(
    private generalService: GenericService,
    private config: ConfigurationService
  ) {
    this.configuration$ = this.config.settings;
  }

  getUserList(
    searchModel: UserSearchModel
  ): Observable<ResponseDto<PageList<UserModel>>> {
    return this.generalService.getData<ResponseDto<PageList<UserModel>>>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.UserList,
      searchModel
    );
  }

  getUserById(currentUserId: number): Observable<ResponseDto<UserAddEditDto>> {
    const userModel: UserIdentityDto = {
      userId: currentUserId,
    };
    return this.generalService.getData<ResponseDto<UserAddEditDto>>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.UserById,
      userModel
    );
  }

  getOnlineUsersIdList(): Observable<number[]> {
    return this.generalService.getData<number[]>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.GetOnlineUsersIdList,
      ''
    );
  }
  GeUserstDropDownList(): Observable<ResponseDto<DropDownListDto[]>> {
    return this.generalService.getData<ResponseDto<DropDownListDto[]>>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.GeUserstDropDownList,
      ''
    );
  }

  updateUser(interactionMode: PageMode, userModel: UserAddEditDto) {
    let url = this.configuration$.AdminApiBaseUrl;
    if (interactionMode === PageMode.Add) {
      url = url + ServiceUrls.AddUser;
    } else {
      url = url + ServiceUrls.UpdateUser;
    }

    return this.generalService.updateData<BaseResult>(url, userModel);
  }

  deleteUser(currentUserId: number): Observable<BaseResult> {
    const delDto: DeleteRequestDto = { id: currentUserId };

    return this.generalService.updateData<BaseResult>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.DeleteUser,
      delDto
    );
  }
  updateActivationOfUser(currentUserId: number): Observable<BaseResult> {
    const delDto: DeleteRequestDto = { id: currentUserId };
    return this.generalService.updateData<BaseResult>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.UpdateActivationStatus,
      delDto
    );
  }

  getUserViews(): Observable<SystemViewModel[]> {
    return this.generalService.getData<SystemViewModel[]>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.GetCurrentUserViews,
      new Object()
    );
  }

  GetUserSupervisorDDL(): Observable<ResponseDto<DropDownListDto[]>> {
    return this.generalService.getData<ResponseDto<DropDownListDto[]>>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.GetUserSupervisorDDLUrl,
      new Object()
    );
  }

  changePassowrd(
    oldPass: string,
    newPass: string
  ): Observable<ResponseDto<BaseResult>> {
    return this.generalService.updateData<ResponseDto<BaseResult>>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.ChangePassowrod,
      {
        Password: oldPass,
        NewPassword: newPass,
      }
    );
  }

  getUserProfileDetails(
    userId: number
  ): Observable<ResponseDto<UserProfileData>> {
    return this.generalService.getData<ResponseDto<UserProfileData>>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.GetUserProfile,
      userId
    );
  }

  updateProfile(
    userProfile: UpdateProfileDto
  ): Observable<ResponseDto<BaseResult>> {
    return this.generalService.updateData<ResponseDto<BaseResult>>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.UpdateUserProfile,
      userProfile
    );
  }
}
