import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {CartPage} from '../cart/cart';
import { PromotionsPage } from '../promotions/promotions';
import { MenuPage } from '../menu/menu';
/*
 * Generated class for the TransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {

  totalPayment = 0;
  amountReceived = 0;
  change = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionPage');
    this.amountReceived = this.navParams.get('amountReceived');
    this.totalPayment = this.navParams.get('totalAmount');
    this.calculateChange();
  }


  calculateChange() {
    if(this.amountReceived>this.totalPayment) {
      this.change = this.amountReceived - this.totalPayment;
    } else {
      this.change = 0;
    }
    
  }

  returnToMenu() {
    this.storage.clear();
    this.navCtrl.setRoot(MenuPage);
  }


}
