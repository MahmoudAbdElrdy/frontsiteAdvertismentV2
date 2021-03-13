import { Injectable } from '@angular/core';
import { GenericService } from './Base/GenericService';
import { ConfigurationService } from 'src/app/@core/settings/Configuration.Service';
import { Observable } from 'rxjs';
import { ResponseDataDto, DeleteAuctionDto, ResponseDDlDto, DDLModel, ResponseRecordDataDto, DeleteRequestDto, PageList } from '../models/common.model';
import { ServiceUrls } from '../Common/ServiceUrls';
import { AddEditcontactUsDto } from '../models/contactUs.model';

@Injectable({
  providedIn: 'root',
})
export class contactUsService {
  private configuration$: Configuration;
  constructor(
    private generalService: GenericService,
    private config: ConfigurationService
  ) {
    this.configuration$ = this.config.settings;
  }




  AddEditNew(model: AddEditcontactUsDto): Observable<ResponseDataDto<boolean>> {
    ;

    let url = this.configuration$.WebApiBaseUrl;
    //  if (model.Id ==0) {
    url = url + ServiceUrls.AddContactus;
    //  }
    //  else
    //  {
    //    url = url + ServiceUrls.EditNews;
    //  }
    return this.generalService.updateData<ResponseDataDto<boolean>>(url, model);
  }

}