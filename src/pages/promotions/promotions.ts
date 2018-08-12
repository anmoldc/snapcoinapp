import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {printer} from '../../providers/printer';
/**
 * Generated class for the PromotionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {

  products = [
    { image: 'assets/imgs/productimages/cake.jpg', name: 'Chocolate Cake', price: 3.00, quantity: 1 },
    { image: 'assets/imgs/productimages/food.jpg', name: 'Mexican rolls', price: 6.00, quantity: 1 },
    { image: 'assets/imgs/productimages/ornage.jpg', name: 'Orange', price: 2.00, quantity: 1 },
    { image: 'assets/imgs/productimages/taco.jpg', name: 'Mexican Taco', price: 5.50, quantity: 1 },
    { image: 'assets/imgs/productimages/cornflakes.jpg', name: 'CornFlakes', price: 5, quantity: 1 },
    { image: 'assets/imgs/productimages/sprite.jpg', name: 'Sprite', price: 1, quantity: 1 }  
  ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private storage: Storage, public app:App, public printService:printer) {
      // array initialised when the app is run 
    this.products = [
      { image: 'assets/imgs/productimages/cake.jpg', name: 'Chocolate Cake', price: 3.00, quantity: 1 },
      { image: 'assets/imgs/productimages/food.jpg', name: 'Mexican rolls', price: 6.00, quantity: 1 },
      { image: 'assets/imgs/productimages/orange.jpg', name: 'Orange', price: 2.00, quantity: 1 },
      { image: 'assets/imgs/productimages/taco.jpg', name: 'Mexican Taco', price: 5.50, quantity: 1 },
      { image: 'assets/imgs/productimages/cornflakes.jpg', name: 'CornFlakes', price: 5, quantity: 1 },
      { image: 'assets/imgs/productimages/sprite.jpg', name: 'Sprite', price: 1, quantity: 1 }  
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionsPage');
  }

  logout() {
    this.storage.clear();
    //this.navCtrl.setRoot(LoginPage);
    this.app.getRootNav().pop();
  }

  printReceipt() {
    this.printService.print();
  }

}
