import { GenericService } from './Base/GenericService';
import { ConfigurationService } from 'src/app/@core/settings/Configuration.Service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceUrls } from '../Common/ServiceUrls';
import { PageList, ResponseDto, BaseResult } from '../models/common.model';
import { contactUsSearchModel, ContactUsModel } from '../models/contactUs.model';
@Injectable({
  providedIn: 'root',
})
export class WebSiteService {


  
  private configuration$: Configuration;

  constructor(
    private generalService: GenericService,
    private config: ConfigurationService
  ) {
    this.configuration$ = this.config.settings;
  }

  GetContactUsPageList(
    searchModel: contactUsSearchModel
  ): Observable<ResponseDto<PageList<ContactUsModel>>> {
    return this.generalService.getData<ResponseDto<PageList<ContactUsModel>>>(
      this.configuration$.CMSManagementApiBaseUrl +
        ServiceUrls.GetContactUsPageList,
      searchModel
    );
  }

  changeContactUsStatus(id: number) {
    return this.generalService.updateData<BaseResult>(
      this.configuration$.CMSManagementApiBaseUrl + ServiceUrls.changeContactUsStatus,
      id
    );
  }
}
