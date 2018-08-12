import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicModule} from 'ionic-angular';


import { LoginPage } from '../pages/login/login';
import {TabsPage} from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { SettingsPage } from '../pages/settings/settings';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;
  
 /*
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.menuPages = [
        { title: 'Home', component: UserPage },
        { title: 'Items', component: ItemPage },
        { title: 'Settings', component: SettingsPage }
        ];
    });
  }
 });
  */

  constructor(public platform: Platform, private storage:Storage) {
    this.initializeApp();
    storage.clear();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: TabsPage},
      { title: 'Settings', component: SettingsPage}
      ];
 }
  initializeApp() {
    this.platform.ready().then(() => {
    });
 }

  loadMenu(page) {
    this.nav.setRoot(page.component);
  }

}
