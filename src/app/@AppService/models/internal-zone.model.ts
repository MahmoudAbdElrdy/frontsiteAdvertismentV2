import { PagingModel } from './common.model';

export interface SearchInternalZoneModel {
  paging: PagingModel;

  zoneId?: number;
  governorateFromId?: number;
  governorateToId?: number;
}

export interface InternalZoneRequestModel {
  internalZoneId: number;
  zoneId: string;
  governorateFromId: string;
  governorateToId: string;
}

export interface InternalZoneResponseModel {
  internalZoneId: number;
  zoneName: string;
  governorateFromName: string;
  governorateToName: string;
}
