import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../Component/loader-component/loader.service';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
      const authReq = request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });

    let timeExeded = false;
    const time = setTimeout(() => {
      this.loaderService.show();
      timeExeded = true;
    }, 300);

    if (
      request.url.includes('ShowConnectedDevices') ||
      request.url.includes('ScanButtonClick')
    ) {
      return next.handle(request).pipe(
        finalize(() => {
          if (!timeExeded) {
            clearTimeout(time);
          }
          this.loaderService.hide();
        })
      );
    } else {
      return next.handle(request).pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {
              if (!timeExeded) {
                clearTimeout(time);
              }
              this.loaderService.hide();
            }
          },
          (error) => {
            if (!timeExeded) {
              clearTimeout(time);
            }
            this.loaderService.hide();
          }
        )
      );
    }
  }
}
