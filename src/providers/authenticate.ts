import {Injectable, Inject} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { properties } from '../providers/properties';

let URL = "http://localhost:8084/API/";
//let URL = "http://18.136.212.226/API/";
//let URL = this.properties.getURL();
@Injectable() 



export class authenticate{

    constructor( public http: Http) {

    }
   
    postAuthentication(userData,endpoint){
        return new Promise((resolve,reject) =>{
             let headers = new Headers();
             var credentials = 'username='+userData.username+'&password='+userData.password;
             headers.append('Content-Type','application/x-www-form-urlencoded');
            this.http.post(URL+endpoint,credentials,{headers:headers})
            .subscribe(res =>{
                resolve(res); 
            }, (err)=>{
                reject(err);
            });
        });
    }
    
}