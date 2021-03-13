import { PagingModel } from './common.model';

export interface UserLogData {
  PageName: string;
  ActionName: string;
  ActionDate: number;
}

export interface SearchUserLogDto {
  paging: PagingModel;
  actionId: number;
  userId: number;
  creationDate: Date;
}
