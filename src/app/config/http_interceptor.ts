import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(private notification: NzNotificationService, private translate: TranslateService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer my-token')
          });
      
          return next.handle(modifiedReq).pipe(
            tap(
                event => {
                  if((event as any)?.body?.code === 'token'){
                    localStorage.setItem('token', (event as any)?.body?.data)
                  }
                },
                error => {
                  if(error.error.code){
                    error.name = '';
                    error.statusText = this.translate.instant(error.error.code);
                  }
                  this.notification.error(error.name,error.statusText)
                }
              )
          );
    }

}