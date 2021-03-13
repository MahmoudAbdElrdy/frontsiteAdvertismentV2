import { PagingModel } from './common.model';
import { AssignType } from '../Enums/user-type';

export interface UserProfileData {
  firstName: string;
  lastName: string;
  postOfficeId: number;
  userProfileImageUrl: string;
  userTypeName: string;
  phone: string;
  mobile: string;
  userRole: string;
  email: string;
  postOfficeName: string;
  userStatusId?: number;
}

export interface UserSearchModel {
  paging: PagingModel;

  firstName: string;
  lastName: string;
  userType: number;
  email: string;
  userStatus: number;
}

export interface UserIdentityDto {
  userId: number;
}

export interface UserAddEditDto {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userTypeId: number;
  postOfficeId: number;
  roleId: number;
  shiftTypeId: number;
  phone: string;
  mobile: string;
  hasTablet: boolean;
  courierCode:string;
}

export interface UserModel {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  userStatus: string;
  password: string;
  roleId?: number;
  userStatusId?: number;
  shiftType: string;
}

export interface UpdateProfileDto {
  firstName: string;
  lastName: string;
  imageUrl: string;
  removeImage: boolean;
}

export interface AssignToUserDto {
  userId?: number;
  assignTypeId: AssignType;
}

export interface ImageInfo {
  imageUrl: string;
  imageName: string;
  imageExtention: string;
  imageSize: string;
}

export interface attchmentDto {
  attachmentFullPath: string;
  name: string;
  
}

export interface SearchCourierDto {
  paging: PagingModel;

  userName: string;
}
export interface UserLocationDto {
  userId: number;
  fullName: string;
  requestCount: number;
  userType: string;
  latitude: string;
  longitude: string;
}
