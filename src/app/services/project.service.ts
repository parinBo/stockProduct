import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_PATH, PATH } from "../config/data_constant";

@Injectable({
    providedIn: 'root'
})
export default class ProjectService {

    host = API_PATH
    constructor(private http: HttpClient) {

    }

    signin(data: {username:string, password: string}){
        return this.http.post<any>(`${this.host + PATH.signin}`, data)
    }


    register(data: any){
        return this.http.post<any>(`${this.host + PATH.register}`, data)
    }
}