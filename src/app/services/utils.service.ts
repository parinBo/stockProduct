import { Injectable } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export default abstract class  Utils{
    constructor(){

    }
    static  noti: NzNotificationService
    static load$ = new Subject<boolean>();
    static coreData:any = {};

    static setLoading(load:boolean){
        this.load$.next(load)
    }

    static getNoti(code: string, msg:string){
        const div = document.createElement('div');
        const p = document.createElement('p');
        div.className = 'notification show';
        p.textContent = msg;
        p.style.color = 'white';
        div.appendChild(p);
        if(code === 'e'){
            div.style.backgroundColor = '--bs-danger';
        }else if(code === 's'){
            div.style.backgroundColor = 'var(--bs-success)';
        }
        document.body.appendChild(div);
        setTimeout(() => {
            document.body.removeChild(div);
        }, 2000);
    }
}