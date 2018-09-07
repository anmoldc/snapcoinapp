import { Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {PromotionsPage} from '../pages/promotions/promotions';
import { Storage } from '@ionic/storage';
import { properties } from '../providers/properties';

let URL = "http://localhost:8084/API/";
//let URL = "http://18.136.212.226/API/";
//let URL = this.properties.getURL();

@Injectable()

export class transactionService {

    constructor(public http: Http, private storage: Storage) {
        
    }
    postTransaction(body, endpoint) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
             headers.append('Content-Type', 'application/x-www-form-urlencoded');
            //console.log("credentials are "+userData.username+" "+userData.password);
            this.http.post(URL + endpoint, body, {headers: headers})
                .subscribe(res => {
                    console.log(res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }


}