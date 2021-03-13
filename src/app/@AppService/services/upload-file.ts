import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/@core/settings/Configuration.Service';
import { ServiceUrls } from '../Common/ServiceUrls';
import { UploadFileResponse, UploadFileListResponse } from '../models/upload-file';
import { HttpRequest, HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFile {
  private configuration$: Configuration;
  constructor(private config: ConfigurationService, private http: HttpClient) {
    this.configuration$ = this.config.settings;
  }

  UploadUserProfile(files: File): Observable<HttpEvent<UploadFileResponse>> {
    return this.uploadFile(files, ServiceUrls.UploadUserProfile);
  }

  UploadRequestImage(files: File): Observable<HttpEvent<UploadFileResponse>> {
    return this.uploadFile(files, ServiceUrls.UploadRequestImage);
  }
  UploadCMSRequestImage(files: File): Observable<HttpEvent<UploadFileResponse>> {
    return this.uploadFile(files, ServiceUrls.UploadCMSRequestImage);
  }

  UploadFilesList(files: File[]): Observable<HttpEvent<UploadFileListResponse[]>> {
    ;
    return this.uploadFileList(files, ServiceUrls.UploadMultiFileUrl);
  }


  private uploadFileList(
    files: File[],
    url: string
  ): Observable<HttpEvent<UploadFileListResponse[]>> {
    ;
    const formData = new FormData();
    if (files != null) {
      for (let i = 0; i < files.length; i++) {
        // formSub.append('file'+i,files[i]);
        formData.append('file', files[i]);

      }
    }


    const uploadReq = new HttpRequest(
      'POST',
      this.configuration$.UploadFilesUrl + url,
      formData,
      {
        reportProgress: false,
      }
    );


    return this.http.request<UploadFileListResponse[]>(uploadReq);
  }

  UploadActionConfirmFile(
    files: File
  ): Observable<HttpEvent<UploadFileResponse>> {
    return this.uploadFile(files, ServiceUrls.UploadActionConfirmFile);
  }

  UploadScannerRequestImage(
    fileContent: string
  ): Observable<HttpEvent<UploadFileResponse>> {
    return this.uploadFileBase(
      fileContent,
      ServiceUrls.UploadScannerRequestImage
    );
  }

  UploadCMSScannerRequestImage(
    fileContent: string
  ): Observable<HttpEvent<UploadFileResponse>> {
    return this.uploadFileBase(
      fileContent,
      ServiceUrls.UploadCMSScannerRequestImage
    );
  }
  UploadLocalization(files: File): Observable<HttpEvent<UploadFileResponse>> {
    return this.uploadFile(files, ServiceUrls.UploadLocalizationImage);
  }

  private uploadFile(
    files: File,
    url: string
  ): Observable<HttpEvent<UploadFileResponse>> {
    const formData = new FormData();
    formData.append('file', files);

    const uploadReq = new HttpRequest(
      'POST',
      this.configuration$.UploadFilesUrl + url,
      formData,
      {
        reportProgress: false,
      }
    );
    return this.http.request<UploadFileResponse>(uploadReq);
  }

  private uploadFileBase(
    fileContent: string,
    url: string
  ): Observable<HttpEvent<UploadFileResponse>> {
    const formData = new FormData();
    formData.append('fileContent', fileContent);

    const uploadReq = new HttpRequest(
      'POST',
      this.configuration$.FileUploadApiBaseUrl + url,
      formData,
      {
        reportProgress: false,
      }
    );
    return this.http.request<UploadFileResponse>(uploadReq);
  }


}
