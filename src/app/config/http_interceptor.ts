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
            headers: req.headers.set('Authorization', ''+ localStorage.getItem('token'))
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
                    if(error.error.message){
                      error.statusText =  (error.error.message as any[]).reduce((prev,now)=> prev += now,'');
                    }
                  }
                  if(error.status === 401){
                    localStorage.removeItem('token');
                    location.reload();
                  }
                  this.notification.error(error.name,error.statusText)
                }
              )
          );
    }

}