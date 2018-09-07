import { Serial } from '@ionic-native/serial';
import { Injectable, Inject } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Injectable()
export class printer {

    constructor(private serial: Serial, private alertCtrl: AlertController) {

    }

    open = false;
    print() {
        this.serial.requestPermission().then(() => {
            console.log("permission granted");
            this.serial.open({
                baudRate: 9800,
                dataBits: 4,
                stopBits: 1,
                parity: 0,
                dtr: true,
                rts: true,
                sleepOnPause: false
            }).then(() => {
                this.open = true;
                console.log('It will write the data now');
                this.serial.write('Thank you for shopping, see you again!');
                let mno = this.alertCtrl.create({
                    title: "Print SUCCESS!",
                    buttons: ['Dismiss']
                });
                mno.present();
            });
        }).catch((errx: any) => {
            console.log("WRITE FAILED", errx);
            let mno = this.alertCtrl.create({
                title: "ERROR: " + errx,
                buttons: ['Dismiss']
            });
            mno.present();
        });
    }

}