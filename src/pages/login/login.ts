import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


//import { UserPage } from '../user/user';
import { authenticate } from '../../providers/authenticate';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  responseData: any;
  userData = { "username": "", "password": "" };
  endpoint = 'LoginServlet';


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authenticate: authenticate, public toast: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }
/*
  login() {
    this.navCtrl.push(TabsPage);
  }
*/
 
  login() {
    this.authenticate.postAuthentication(this.userData, this.endpoint).then(result => {
      this.responseData = result;
      console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      let sucess = this.toast.create({
        message: 'Login successful',
        duration: 2000,
        position: 'top'
      });
      sucess.present(sucess);
      this.navCtrl.push(TabsPage);
    }, (err) => {
      let fail = this.toast.create({
        message: 'Invalid Credentials',
        duration: 2000,
        position: 'top'
      });
      fail.present(fail);
    });
  }

}
