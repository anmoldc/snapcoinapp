import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CheckoutPage } from '../checkout/checkout';

/**
 * Generated class for the ShoppingcartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  getItemsAddedFromCart = [];

  products: any;
  receiptItems = [];
  totalPayment = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.products = [
      { Id: 1, image: 'assets/imgs/productimages/cake.jpg', name: 'Chocolate Cake', price: 3.00, quantity: 1 },
      { Id: 2, image: 'assets/imgs/productimages/food.jpg', name: 'Mexican rolls', price: 6.00, quantity: 1 },
      { Id: 3, image: 'assets/imgs/productimages/orange.jpg', name: 'Orange', price: 2.00, quantity: 1 },
      { Id: 4, image: 'assets/imgs/productimages/taco.jpg', name: 'Mexican Taco', price: 5.50, quantity: 1 },
      { Id: 5, image: 'assets/imgs/productimages/cornflakes.jpg', name: 'CornFlakes', price: 5, quantity: 1 },
      { Id: 6, image: 'assets/imgs/productimages/sprite.jpg', name: 'Sprite', price: 1, quantity: 1 }
    ];
  }



  ionViewWillEnter() {
    console.log('ionViewDidLoad ShoppingcartPage');
    //this.getItemsAddedFromCart = this.navParams.get('itemsAdded');
    this.storage.get("CartItems").then((val) => {
      this.getItemsAddedFromCart = val;
      this.receiptItems = val;
      try {
        this.calculateTotal();
      } catch (err) {
        this.getItemsAddedFromCart = new Array();
      }
      this.totalPayment = this.calculateTotal();
    });
    console.log(this.getItemsAddedFromCart);
  }


  calculateTotal() {
    var total = 0;
    this.getItemsAddedFromCart.forEach(item => total = total + (item.price * item.quantity));
    return total;
  }

  removeItem(item) {
    for (var i = 0; i < this.getItemsAddedFromCart.length; i++) {
      if (this.getItemsAddedFromCart[i] == item) {
        this.getItemsAddedFromCart.splice(i, 1);
      }
    }
    this.totalPayment = this.calculateTotal();
    this.storage.set('CartItems', this.getItemsAddedFromCart);
    this.receiptItems = this.getItemsAddedFromCart;

  }

  incrementProduct(item){
    for(var i=0;i<this.getItemsAddedFromCart.length;i++) {
      var product = this.getItemsAddedFromCart[i];
      if(product.name==item) {
        product.quantity++;
        this.totalPayment = this.calculateTotal();
      }
    }
  }

  decrementProduct(item){
    for(var i=0;i<this.getItemsAddedFromCart.length;i++) {
      var product = this.getItemsAddedFromCart[i];
      if(product.name==item) {
        if(product.quantity>1) {
          product.quantity--
          this.totalPayment = this.calculateTotal();
        }
      }
    }
  }

  loadCheckoutPage() {
    this.navCtrl.push(CheckoutPage, { items: this.receiptItems, total: this.totalPayment });
  }

}  