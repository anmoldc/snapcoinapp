import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class searchItems {

    products: any;

    constructor(public http: Http) {
        this.products = [
            { image: 'assets/imgs/productimages/cake.jpg', name: 'Choco Cake', price: 3.00, quantity: 1 },
            { image: 'assets/imgs/productimages/food.jpg', name: 'Mexican rolls', price: 6.00, quantity: 1 },
            { image: 'assets/imgs/productimages/orange.jpg', name: 'Orange', price: 2.00, quantity: 1 },
            { image: 'assets/imgs/productimages/taco.jpg', name: 'Mexican Taco', price: 5.50, quantity: 1 }
        ]
    }

    filterItems(searchResult) {
        return this.products.filter((product) => {
            return product.name.toLowerCase().indexOf(searchResult.toLowerCase()) > -1;
        });
    }



}