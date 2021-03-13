import { PagingModel } from './common.model';

export interface WeightRangeSearchModel {
  paging: PagingModel;
  weightFrom?: number;
  weightTo?: number;
}

export interface WeightRangeDropDownModel {
  weightRangeId: number;
  weightRangeTitle: string;
}

export interface WeightRangeModel {
  weightRangeId: number;
  weightFrom: number;
  weightTo: number;
}
