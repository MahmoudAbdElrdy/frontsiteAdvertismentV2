import { Injectable } from '@angular/core';
import { GenericService } from './Base/GenericService';
import { ConfigurationService } from 'src/app/@core/settings/Configuration.Service';
import { RegisterDto } from '../models/Register.model';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseDataDto, BaseResult } from '../models/common.model';
import { ServiceUrls } from '../Common/ServiceUrls';

@Injectable({
    providedIn: 'root',
  })
  export class RegisterService {
    private configuration$: Configuration;
    constructor(private generalService: GenericService,private config: ConfigurationService) {
      this.configuration$ = this.config.settings;
    }
    Register(model: RegisterDto): Observable<BaseResult> {
        ;
         let url = this.configuration$.WebApiProxyBaseUrl+ServiceUrls.Register;
         return this.generalService.postData<BaseResult>(url,model);
       }
    // Register(registerDto: RegisterDto): Observable<BaseResult> {
    //     ;

    //      let url = this.configuration$.WebApiBaseUrl;
        
    //        url = url + ServiceUrls.Register;
    //      return this.generalService.updateData<BaseResult>(url,registerDto);
    //    }
}