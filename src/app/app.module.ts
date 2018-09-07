// native
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavParams, Tab } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Serial } from '@ionic-native/serial';


// providers
import {HttpModule} from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import{authenticate} from '../providers/authenticate';
import{requestdata} from '../providers/requestdata';
import{searchItems} from '../providers/searchItems';
import {transactionService} from '../providers/transactionService';
import {properties} from '../providers/properties';
import {printer} from '../providers/printer';

//pages
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { PromotionsPage } from '../pages/promotions/promotions';
import { CartPage } from '../pages/cart/cart';
import { DineInPage } from '../pages/dinein/dinein';
import { CategoryPage } from '../pages/category/category';
import { MenuPage } from '../pages/menu/menu';
import { SettingsPage } from '../pages/settings/settings';
import {CheckoutPage} from '../pages/checkout/checkout';
import {TransactionPage} from '../pages/transaction/transaction';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    PromotionsPage,
    DineInPage,
    CartPage,
    MenuPage,
    CategoryPage,
    SettingsPage,
    CheckoutPage,
    TransactionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    PromotionsPage,
    DineInPage,
    CartPage,
    MenuPage,
    CategoryPage,
    SettingsPage,
    CheckoutPage,
    TransactionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClient, authenticate, requestdata, searchItems, transactionService, Serial, printer, properties
  ]
})
export class AppModule {}
