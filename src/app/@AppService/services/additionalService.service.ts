import { Injectable } from '@angular/core';
import { GenericService } from './Base/GenericService';
import { ConfigurationService } from 'src/app/@core/settings/Configuration.Service';
import { Observable } from 'rxjs';
import { ServiceUrls } from '../Common/ServiceUrls';
import {
  AdditionalServiceSearchModel,
  AdditionalServiceDto,
  AdditionalServicePriceDto,
} from '../models/additional-service.model';
import {
  ResponseDto,
  PageList,
  DeleteRequestDto,
  BaseResult,
} from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class AdditionalServiceService {
  private configuration$: Configuration;
  constructor(
    private generalService: GenericService,
    private config: ConfigurationService
  ) {
    this.configuration$ = this.config.settings;
  }
  getAllAdditionalServiceList(
    searchModel: AdditionalServiceSearchModel
  ): Observable<ResponseDto<PageList<AdditionalServiceDto>>> {
    return this.generalService.getData<
      ResponseDto<PageList<AdditionalServiceDto>>
    >(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.AdditionalServiceList,
      searchModel
    );
  }

  getAdditionalServiceById(
    additionalServiceId: number
  ): Observable<ResponseDto<AdditionalServiceDto>> {
    const fixedServicePriceDto: DeleteRequestDto = { id: additionalServiceId };
    return this.generalService.updateData<ResponseDto<AdditionalServiceDto>>(
      this.configuration$.AdminApiBaseUrl +
        ServiceUrls.GetAdditionalServiceById,
      fixedServicePriceDto
    );
  }

  updateAdditionalService(
    additionalServicePriceDto: AdditionalServicePriceDto
  ) {
    return this.generalService.updateData<BaseResult>(
      this.configuration$.AdminApiBaseUrl + ServiceUrls.UpdateAdditionalService,
      additionalServicePriceDto
    );
  }
}
