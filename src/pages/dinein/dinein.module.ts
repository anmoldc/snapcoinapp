import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DineInPage } from './dinein';

@NgModule({
  declarations: [
    DineInPage,
  ],
  imports: [
    IonicPageModule.forChild(DineInPage),
  ],
})
export class DineInPageModule {}
