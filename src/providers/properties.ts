import { Injectable} from '@angular/core';


@Injectable()

export class properties {

    address = "http://18.136.212.226/API/";    

    constructor() {
        
    }

    getURL() {
        return this.address;
    }

}