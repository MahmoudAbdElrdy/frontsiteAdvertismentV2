import { PagingModel } from './common.model';

export interface AdditionalServiceSearchModel {
  paging: PagingModel;
  additionalServiceName: string;
  price?: number;
  additionalServiceTypeId: number;
}

export interface AdditionalServiceDto {
  additionalServiceId: string;
  additionalServiceName: string;
  price: string;
  additionalServiceTypeName: string;
}

export interface AdditionalServiceModel {
  additionalServiceId: string;
  additionalServiceName: string;
  price: number;
  additionalServiceTypeId: number;
}

export interface AdditionalServicePriceDto {
  additionalServiceId: string;
  price: number;
}
