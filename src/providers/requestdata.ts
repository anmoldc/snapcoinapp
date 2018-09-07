import {Injectable, Inject} from '@angular/core';
import {Http,Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { properties } from '../providers/properties';

//let URL = "http://18.136.212.226/API/";
//let URL = this.properties.getURL();
let URL = "http://localhost:8084/API/";

@Injectable() 



export class requestdata{

    constructor( private http: Http) {

    }

    getData(endpoint,outletName,companyName){
        return new Promise((resolve,reject) =>{
             let headers = new Headers();
             headers.append('Content-Type','application/x-www-form-urlencoded');
             companyName = "&companyName="+ companyName;
             outletName = "?outletName=" + outletName;
            this.http.get(URL+endpoint+outletName+companyName)
            .subscribe(res =>{
                resolve(res.json());  
            }, (err)=>{
                reject(err);
            });
        });
    }

   


}