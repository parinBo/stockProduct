import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(private notification: NzNotificationService){}
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
                  this.notification.error(error.name,error.statusText)
                }
              )
          );
    }

}