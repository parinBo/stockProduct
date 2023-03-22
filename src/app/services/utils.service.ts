import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export default class  Utils{
    static load$ = new Subject<boolean>();

    static setLoading(load:boolean){
        this.load$.next(load)
    }
}