import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CartPage } from '../cart/cart';
import { requestdata } from '../../providers/requestdata';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  results: {};
  scannedCode = null;

  //product items
  itemsAddedToCart = [];
  


  //Query for products
  originalList: any;
  filteredList: any;

  // array of products defined before constructor 
  products: any;
  productsList: any;
  productSearch: any;
 

  //search feature 
  searchResult: String = '';
  possibleSearchResults: any;

  ionViewDidLoad() {
    

  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private storage: Storage,  public toast: ToastController,
    public getReq:requestdata) {
    // array initialised when the app is run 
    this.productsList = [
      { id: 1, image: 'assets/imgs/productimages/cake.jpg', name: 'Chocolate Cake', price: 3.00, quantity: 1 },
      { id: 2, image: 'assets/imgs/productimages/food.jpg', name: 'Mexican rolls', price: 6.00, quantity: 1 },
      { id: 3, image: 'assets/imgs/productimages/orange.jpg', name: 'Orange', price: 2.00, quantity: 1 },
      { id: 4, image: 'assets/imgs/productimages/taco.jpg', name: 'Mexican Taco', price: 5.50, quantity: 1 },
      { id: 5, image: 'assets/imgs/productimages/cornflakes.jpg', name: 'CornFlakes', price: 5, quantity: 1 },
      { id: 6, image: 'assets/imgs/productimages/sprite.jpg', name: 'Sprite', price: 1, quantity: 1 }
    ];
    this.products = [...this.productsList];
    this.productSearch = [...this.productsList];
  }

  ionViewWillEnter() {
    
    this.storage.get('CartItems')
      .then(item => {
        if (item && item.length) {
          this.itemsAddedToCart = [...item];
        } else {
          this.itemsAddedToCart = [];
        }
      })
  }

  // search feature filters items 
  filterItems(searchResult) {
    if (searchResult) {
      return this.products = this.productSearch.filter((product) => {
        return product.name.toLowerCase().indexOf(searchResult.toLowerCase()) > -1;
      });
    } else {
      return this.products = this.productsList;
    }
  }

  // search bar method to search for the result 
  getSearchResult() {
    this.products = this.filterItems(this.searchResult);
  }

  index: any;
  //add to cart method 
  addToCart(product: any) {
    var cartItem: any = {
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }
    var check =  0;
    for (var i = 0; i < this.itemsAddedToCart.length; i++) {
      var item = this.itemsAddedToCart[i];
      var itemName = item.name;
      if (itemName == cartItem.name) {
        check = check + 1;
        console.log("inside if");
        console.log(itemName);
        console.log(cartItem.name);
        this.index = i;
        var itemQuantity = cartItem.quantity;
        item.quantity = item.quantity + itemQuantity;
        console.log(this.itemsAddedToCart);
        this.itemsAddedToCart.splice(this.index, 1, item);
        let sucess = this.toast.create({
          message: 'Item added',
          duration: 2000,
          position: 'top'
        });
        sucess.present(sucess);
      } 
    }
    if(check==0) {
      this.itemsAddedToCart.push(cartItem);
      let sucess = this.toast.create({
        message: 'item added',
        duration: 2000,
        position: 'top'
      });
      sucess.present(sucess);
    }
    console.log(this.itemsAddedToCart);
    this.storage.set('CartItems', this.itemsAddedToCart);
    
  }


  loadShoppingCart() {
    //this.navCtrl.push(ShoppingcartPage, { itemsAdded: this.itemsAddedToCart });
    //this.navCtrl.parent.select(3);
    this.storage.clear;
  }

  // method to increment the product quantity on the menu page 
  increment(product) {
    product.quantity++;
  }

  // method to decrement the product quantity on the menu page 
  decrement(product) {
    if (product.quantity > 1) {
      product.quantity--;
    }

  }

  // sends the user to the Login page 
  logoutFunction() {
    this.navCtrl.push(LoginPage);
  }

  // methods for qr scanner
  /*
    async loadScanner() {
      this.results = await this.barcode.scan();
      alert(this.results);
      
    }
  */
  /*
   loadScanner() {
     this.barcodeScanner.scan().then(barcodeData => {
       this.scannedCode = barcodeData.text;
     }, (err) => {
       console.log('Error: ', err);
     });
   }
 */
  getItems(event): void {

  }

  // to implement when click on item to view more details
  viewProductDetails(product) {

  }

  resetFilteredData() {
    this.filteredList = JSON.parse(JSON.stringify(this.originalList));
  }

  // method to filter data in the list based on the criteria 
  filterData(lesserThan2: boolean, greaterThan5: boolean) {
    this.filteredList = this.filteredList.filter((product) => {
      if (lesserThan2) {
        return product.price > 2;
      }
      if (greaterThan5) {
        return product.price < 5
      }
    });
  }
}



