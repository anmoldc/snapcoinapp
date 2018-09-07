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
  companyName: any;

  username = "";
  endpoint = 'TransactionInputServlet';
  responseData: any;

  purchases = [];
  type:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage
    , public alertCtrl: AlertController, public transaction: transactionService, public toast: ToastController) {

  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad CheckoutPage');
    this.itemsInCart = this.navParams.get('items');
    this.storage.set('getReceiptItems', this.itemsInCart);
    this.totalPayment = this.navParams.get('total');
    console.log("length of items in cart inside viewWillEnter " + this.itemsInCart.length);
    this.companyName = this.retrieveCompanyName();
    console.log("company name is " + this.companyName);

    this.itemsInCart.forEach(item => {
      var purchase = {
        food_name: item.name,
        quantity: item.quantity
      }
      console.log("the items are " + purchase);
      this.purchases.push(purchase);
    });
    console.log("purchases length insde viewWillEnter is "+this.purchases.length);
  }



  retriveUsername() {
    var user: any;
    let body: any;
    var loginResponse = localStorage.getItem('userData');
    var obj = JSON.parse(loginResponse);
    body = JSON.parse(obj._body);
    user = body.username;
    return user;
  }

  val(val) {
    this.type = val;
  }

  retrieveDate() {
    //var date = new Date().toLocaleDateString();
    var d = new Date();
    console.log(d);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var date = year + "-" + month + "-" + day;
    var time = new Date().toLocaleTimeString();
    console.log("the time is"+time);
    var dateTime = date + " " + time;
    return dateTime;
  }

  body = { "username": this.retriveUsername(), "dateTime": this.retrieveDate(), "purchases": this.purchases, "type":this.type };


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
               this.navCtrl.push(TransactionPage, { amountReceived: data.amount, totalAmount: this.totalPayment });
             }
   
           }
         }
       ]
     });
     prompt.present();    
   }
 */
   printItems() {
     this.purchases.forEach(item => {
      console.log(item);
     });
   }

   retrieveCompanyName(){
      var body : any;
      var company : any;    
      var loginResponse = localStorage.getItem('userData');
      var obj = JSON.parse(loginResponse);
      body = JSON.parse(obj._body);
      company = body.companyName;
      return company;
    }


  payment() {
    console.log("the body is " + "username: "+this.body.username+", dateTime: "+this.body.dateTime);
    this.printItems();
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
              this.username = this.retriveUsername();
              this.transaction.postTransaction(this.body, this.endpoint).then(result => {
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

}

