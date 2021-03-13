import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceUrls } from '../Common/ServiceUrls';
import { ResponseRecordDataDto } from '../models/common.model';
import { StaticPageDto } from '../models/static-page.model';
import { ConfigurationService } from './../../@core/settings/Configuration.Service';
import { GenericService } from './Base/GenericService';

@Injectable({
  providedIn: 'root',
})
export class StaticPageService {
  private configuration$: Configuration;
  constructor(
    private generalService: GenericService,
    private config: ConfigurationService
  ) {
    this.configuration$ = this.config.settings;
  }


  GetUsingInstructionsData(): Observable<ResponseRecordDataDto<StaticPageDto>> {
    return this.generalService.getData<ResponseRecordDataDto<StaticPageDto>>(
      this.configuration$.WebApiBaseUrl + ServiceUrls.GetUsingInstructionsData,
      new Object()

    );
  }

}