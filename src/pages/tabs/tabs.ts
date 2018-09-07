import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MenuPage} from '../menu/menu';
import {DineInPage} from '../dinein/dinein';
import {SettingsPage} from '../settings/settings';


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

  dineIn = DineInPage;
  takeAway = MenuPage;
  settings = SettingsPage;
}
