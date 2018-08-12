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
                this.serial.write('this is a trial message');
            });
        }).catch((error: any) => {

        });
    }

}