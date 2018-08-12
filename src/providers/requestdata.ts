import {Injectable, Inject} from '@angular/core';

import {Http,Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

let URL = "http://localhost:8084/API/";

@Injectable() 



export class requestdata{

    constructor( private http: Http) {

    }

    getData(endpoint){
        return new Promise((resolve,reject) =>{
             let headers = new Headers();
             headers.append('Content-Type','application/x-www-form-urlencoded');
            this.http.get(URL+endpoint,{headers:headers})
            .subscribe(res =>{
                resolve(res.json());  
            }, (err)=>{
                reject(err);
            });
        });
    }

   


}