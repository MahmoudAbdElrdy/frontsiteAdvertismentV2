import { Injectable } from '@angular/core';
import { GenericService } from './Base/GenericService';
import { ConfigurationService } from 'src/app/@core/settings/Configuration.Service';
import { Observable } from 'rxjs';
import { ResponseRecordDataDto, DeleteRequestDto, ResponseDataDto } from '../models/common.model';
import { ServiceUrls } from '../Common/ServiceUrls';
import { CreatUpdtaeHomeSliderDto } from '../models/home-slider-model';

@Injectable({
    providedIn: 'root',
  })
  export class HomeSliderService {
    private configuration$: Configuration;
    constructor(
      private generalService: GenericService,
      private config: ConfigurationService
    ) {
      this.configuration$ = this.config.settings;
    }
  

   

     
    GetLoadById(
        currentId: number
      ): Observable<ResponseRecordDataDto<CreatUpdtaeHomeSliderDto>> {
        const model: DeleteRequestDto = { id: Number(currentId) };
        return this.generalService.getData<ResponseRecordDataDto<CreatUpdtaeHomeSliderDto>>(
          this.configuration$.WebApiBaseUrl + ServiceUrls.GetHomeSliderById,
          model
        );
      }
  
   


  
  }