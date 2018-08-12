import { Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let URL = "http://localhost:8084/API/";
var date = new Date();
var items = [];

@Injectable()

export class transactionService {

    constructor(public http: Http) {

    }

    postTransaction(userData, endpoint) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            let body = {
                username: "admin",
                dateTime: date,
                purchases: items
            }
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