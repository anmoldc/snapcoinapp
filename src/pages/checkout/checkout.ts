import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { TransactionPage } from '../transaction/transaction';
import { transactionService } from '../../providers/transactionService';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  itemsInCart = [];
  totalPayment = 0;
  amountReceived = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage
    , public alertCtrl: AlertController, public transaction: transactionService, public toast: ToastController) {

  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad CheckoutPage');
    this.itemsInCart = this.navParams.get('items');
    this.totalPayment = this.navParams.get('total');
    console.log(this.itemsInCart);
  }

  username = "outletName1";
  endpoint = 'TransactionInputServlet';
  responseData: any;

  
  payment() {
    const prompt = this.alertCtrl.create({
      title: 'Payment',
      message: "Enter amount received",
      inputs: [
        {
          name: 'amount',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Next',
          handler: data => {
            if (data.amount < this.totalPayment) {
              const alert = this.alertCtrl.create({
                title: 'Invalid Input',
                subTitle: 'Amount tendered is less than payable amount!',
                buttons: ['Try Again']
              });
              alert.present();
            } else {
              this.navCtrl.push(TransactionPage, { amountReceived: data.amount, totalAmount: this.totalPayment });
            }
  
          }
        }
      ]
    });
    prompt.present();    
  }

/*

payment() {
  const prompt = this.alertCtrl.create({
    title: 'Payment',
    message: "Enter amount received",
    inputs: [
      {
        name: 'amount',
        placeholder: ''
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Next',
        handler: data => {
          if (data.amount < this.totalPayment) {
            const alert = this.alertCtrl.create({
              title: 'Invalid Input',
              subTitle: 'Amount tendered is less than payable amount!',
              buttons: ['Try Again']
            });
            alert.present();
          } else {
            this.transaction.postTransaction(this.username, this.endpoint).then(result => {
              this.responseData = result;
              console.log('response data is ' + this.responseData);
              localStorage.setItem('transactionData', JSON.stringify(this.responseData));
              let sucess = this.toast.create({
                message: 'Transaction Successful',
                duration: 2000,
                position: 'top'
              });
              sucess.present(sucess);
              this.navCtrl.push(TransactionPage, { amountReceived: data.amount, totalAmount: this.totalPayment });
            }, (err) => {
              let fail = this.toast.create({
                message: 'Transaction Unsuccessful',
                duration: 2000,
                position: 'top'
              });
              fail.present(fail);
            });
          }

        }
      }
    ]
  });
  prompt.present();
}
*/
}

