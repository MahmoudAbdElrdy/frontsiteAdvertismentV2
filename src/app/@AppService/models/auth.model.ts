import { BaseResult } from './common.model';

export interface LoginUser {
  userMail: string;
  password: string;
}

export interface ForgetPassword {
  userEmail: string;
}

export interface LoginResponse {
  governorateId: number;
  userId: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  userType: string;
  userTypeId?: number;
  postOfficeName: string;
  postOfficeId?: number;
  authToken: string;
}

export interface UserViewAction {
  pageId: number;
}
