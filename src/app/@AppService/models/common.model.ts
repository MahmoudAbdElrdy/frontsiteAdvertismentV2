import { ResultStatusEnum } from '../Enums/common';
import { PageMode } from '../Enums/security';

export interface BaseResult {
  result: number;
  message: string;
}

export interface RequestDto<T> {
  language: number;
  requestData: T;
}

export interface RequestDataDto<T> {
  data: T;
}

export interface BaseRequestDto<T> {
  data: T;
}
export interface ResponseDto<T> {
  result: ResultStatusEnum;
  message: string;
  responseData: T;
}

export interface ResponseDDlDto<T> {
  result: ResultStatusEnum;
  message: string;
  innerData: T[];
}

export interface ResponseDataDto<T> {
  result: ResultStatusEnum;
  message: string;
  innerData: innerData<T>;
}

export interface innerData<T>
{
  dataList:T[];
  totalCount:number;
}

export interface ResponseRecordDataDto<T> {
  result: ResultStatusEnum;
  message: string;
  innerData: T;
}
export interface innerDataOutput<T>
{
  result: ResultStatusEnum;
  message: string;
  innerData:T[];
  
}
export interface EmptyRequestDto
{
  
}




export interface SortingModel {
  SortingExpression: string;
  SortingDirection: number;
}

export interface PagingModel {
  pageSize: number;
  pageNumber:number;
  sortingModel: SortingModel;
}

export interface PagingDto extends SortingModel {
  index:number;
  pageSize: number;
}

export interface PageList<T> {
  dataList: T[];
  totalCount: number;
}

export interface DeleteRequestDto {
  id: number;
}
export interface DeleteTenderDto
{
  id:number;
}

export interface DeleteAuctionDto
{
  id:number;
}
export interface DropDownListDto {
  id: number;
  name: string;
}

export interface DDLModel {
  id: number;
  name: string;
}
export interface DropDownResponse {
  dataList: DropDownListDto[];
}

export interface PageInteractionMode {
  pageMode: PageMode;
  redirectData: any;
}

export interface LookupContentDropDown {
  lookupContentId: number;
  lookupContentName: string;
  colorCode: string;
  contentDescription: string;
  imageUrl: string;
  hoverImageUrl: string;
  isSelected: boolean;
}
export interface DeleteTenderDto
{
  id:number;
}