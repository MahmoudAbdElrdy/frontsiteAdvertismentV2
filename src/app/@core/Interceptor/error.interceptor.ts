import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        } else if (err.status === 403) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        } else if (err.status === 500) {
          this.router.navigate(['/pages/500']);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
