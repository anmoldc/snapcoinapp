import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MenuPage} from '../menu/menu';
import {CartPage} from '../cart/cart';
import {CategoryPage} from '../category/category';
import {PromotionsPage} from '../promotions/promotions';
import {OrderPage} from '../order/order';



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  promotions = PromotionsPage;
  category = CategoryPage;
  menu = MenuPage;
  cart = CartPage;
  order = OrderPage;
  
}
