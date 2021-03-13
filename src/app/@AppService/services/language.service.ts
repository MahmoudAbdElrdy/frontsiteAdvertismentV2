import { GenericService } from './Base/GenericService';
import { ConfigurationService } from 'src/app/@core/settings/Configuration.Service';
import { Observable } from 'rxjs';
import { ServiceUrls } from '../Common/ServiceUrls';
import { Injectable } from '@angular/core';

import {
  LanguageModel,
  CreateLanguageModel,
  UpdateLanguageModel,
  LanguageSearchModel,
} from '../models/language.model';
import { ResponseDto, PageList, DeleteRequestDto, BaseResult } from '../models/common.model';
import { PageMode } from '../Enums/security';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private configuration$: Configuration;
  constructor(
    private generalService: GenericService,
    private config: ConfigurationService
  ) {
    this.configuration$ = this.config.settings;
  }

  GetLangugeList(): Observable<ResponseDto<LanguageModel[]>> {
    return this.generalService.getData<ResponseDto<LanguageModel[]>>(
      this.configuration$.AuthApiBaseUrl + ServiceUrls.LanguageUrl,
      new Object()
    );
  }

  getAllLangugeList(
    searchModel: LanguageSearchModel
  ): Observable<ResponseDto<PageList<LanguageModel>>> {
    return this.generalService.getData<ResponseDto<PageList<LanguageModel>>>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.GetAllLangugeList,
      searchModel
    );
  }

  getLangugeById(langid: number): Observable<ResponseDto<LanguageModel>> {
    const officeDto: DeleteRequestDto = { id: langid };
    return this.generalService.getData<ResponseDto<LanguageModel>>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.GetLangugeById,
      officeDto
    );
  }

  deleteLanguge(langid: number) {
    const delDto: DeleteRequestDto = { id: langid };
    return this.generalService.updateData<BaseResult>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.DeleteLanguge,
      delDto
    );
  }

  updateLangugeLocalization(interactionMode: PageMode, postOfficeModel: LanguageModel) {
    let url = this.configuration$.AdminApiBaseUrl;
    if (interactionMode === PageMode.Add) {
      url = url + ServiceUrls.CreateLangugeContent;
    } else {
      url = url + ServiceUrls.UpdateLangugeContent;
    }

    return this.generalService.updateData<BaseResult>(url, postOfficeModel);
  }

}
