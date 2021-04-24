import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";


@Injectable()
export class InterceptService implements HttpInterceptor {
    constructor(    private translate: TranslateService,
		) { }
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${localStorage.getItem('userToken')}`,
				Lang:JSON.parse(localStorage.getItem("ipmats-currentLanguage")).languageAliase,
				WebToken:localStorage.getItem("fcm_web_token")
			}
		});
		
		return next.handle(request)
			.pipe(
				tap(
                    event => {
						if (event instanceof HttpResponse) {
						}
					},
					error => {
						if (error.status === 401) {
							localStorage.clear();
						}
					},
				),

			);
	}

}