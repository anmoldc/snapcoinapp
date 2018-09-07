import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CheckoutPage } from '../checkout/checkout';
import { AlertController } from 'ionic-angular';

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
  receiptItems = [];
  totalPayment = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage: Storage,public alertCtrl: AlertController) {
    
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
    if(this.getItemsAddedFromCart.length == 0 ){
      const prompt = this.alertCtrl.create({
        title: 'No Items Added',
        message: "Please add items into cart before checkout!",
      });
      prompt.present();
    } else {
      this.navCtrl.push(CheckoutPage, { items: this.receiptItems, total: this.totalPayment });
    }
  }

  
}  