import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  categories = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.categories = [
      {image:'assets/imgs/productimages/cake.jpg',name:'Appetizers'},
      {image:'assets/imgs/productimages/orange.jpg',name:'Main Course'},
      {image:'assets/imgs/productimages/sprite.jpg',name:'Salads'},
      {image:'assets/imgs/productimages/cake.jpg',name:'Salads'},
      {image:'assets/imgs/productimages/cake.jpg',name:'Salads'}
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
