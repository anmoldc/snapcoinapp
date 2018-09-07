import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * 
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dinein',
  templateUrl: 'dinein.html',
})


export class DineInPage {

  tablesList = [];
  flag = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private storage: Storage, private modal:ModalController) {


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  createTable() {
    var check = true;
    const prompt = this.alertCtrl.create({
      title: 'Create Table',
      message: "Enter Table Number",
      inputs: [
        {
          name: 'number',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Done',
          handler: data => {
            if (this.tablesList.length == 0) {
              var table: any = {
                tableNumber: data.number
              }
              this.tablesList.push(table);
            } else {
              for (var i = 0; i < this.tablesList.length; i++) {
                var table = this.tablesList[i];
                if (table.tableNumber == data.number) {
                  const invalidTable = this.alertCtrl.create({
                    title: 'Invalid Entry',
                    message: "Table Number exists. Please enter a valid Number"
                  });
                  invalidTable.present();
                  check = false;
                  break;
                }
              }
              if(check) {
                var table: any = {
                  tableNumber: data.number
                }
                this.tablesList.push(table);
              }
            }
          }
        },
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    prompt.present();

  }

}
