import { GenericService } from './Base/GenericService';
import { Injectable } from '@angular/core';
import { ServiceUrls } from '../Common/ServiceUrls';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/@core/settings/Configuration.Service';
import { ResponseDto, PageList } from '../models/common.model';
import { SearchUserLogDto, UserLogData } from '../models/userLog.model';

@Injectable({
  providedIn: 'root',
})
export class UserLogService {
  private configuration$: Configuration;
  constructor(
    private generalService: GenericService,
    private config: ConfigurationService
  ) {
    this.configuration$ = this.config.settings;
  }

  getUserLogList(
    searchModel: SearchUserLogDto
  ): Observable<ResponseDto<PageList<UserLogData>>> {
    return this.generalService.getData<ResponseDto<PageList<UserLogData>>>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.GetUserlogData,
      searchModel
    );
  }
}
