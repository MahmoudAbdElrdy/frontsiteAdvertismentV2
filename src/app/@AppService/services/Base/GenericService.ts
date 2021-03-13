import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageHandler } from 'src/app/@core/language/lanugage-handler';
import { RequestDto, BaseRequestDto, RequestDataDto } from '../../models/common.model';


@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private http: HttpClient, private language: LanguageHandler) { }

  // READ

  getData<T>(actionUrl: string, requestObj: T | any): Observable<T> {
    const data: BaseRequestDto<T> = {
      // language: this.language.GetLanguageId(),
      data: requestObj,
    };

    return this.http.post<T>(actionUrl, data);
  }
  
  getDataget<T>(actionUrl: string, requestObj: any): Observable<any> {
    return this.http.get<any>(actionUrl, requestObj);
  }
  
  getData2(actionUrl: string,accountNumberFilter:string) {
    // const data: BaseRequestDto<T> = {
     // language: this.language.GetLanguageId(),
      // data: requestObj,
    //};

    return this.http.get(actionUrl);
  }


  getDataWithoutData<T>(actionUrl: string, requestObj: T | any): Observable<T> {

    return this.http.post<T>(actionUrl, requestObj);
  }
  


  getDataList<T>(actionUrl: string, requestObj: T | any): Observable<T[]> {
    const data: RequestDto<T> = {
      language: this.language.GetLanguageId(),
      requestData: requestObj,
    };

    return this.http.post<T[]>(actionUrl, data);
  }

  // CURD
  updateData<T>(actionUrl: string, requestObj: T | any): Observable<T> {
    const data: BaseRequestDto<T> = {
      data: requestObj,
    };

    return this.http.post<T>(actionUrl, data);
  }
  updateData2<T>(actionUrl: string, requestObj: T | any): Observable<T> {
  

    return this.http.post<T>(actionUrl, requestObj);
  }

  
  postData<T>(actionUrl: string, requestObj: T | any): Observable<T> {

    return this.http.post<T>(actionUrl, requestObj);
  }
  updateDataWithoutData<T>(actionUrl: string, requestObj: T | any): Observable<T> {
    
    return this.http.post<T>(actionUrl, requestObj);
  }


}
