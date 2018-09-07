import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CartPage } from '../cart/cart';
import { requestdata } from '../../providers/requestdata';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
//this one is mine
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
  endpoint = "MenuRequestServlet";
  outletName: any;
  companyName:any;
  results: {};

  //product items
  itemsAddedToCart = [];
  responseData: any;
  inputList = [];
  categories = [];


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


  constructor(public navCtrl: NavController,
    public navParams: NavParams, private storage: Storage, public toast: ToastController,
    public getReq: requestdata) {
    
    this.outletName = this.retrieveOutletName();
    this.companyName = this.retrieveCompanyName();
    this.getReq.getData(this.endpoint, this.outletName, this.companyName).then(result => {
      this.responseData = result;
      console.log(this.responseData);
      var response = JSON.stringify(result);
      var obj = JSON.parse(response);
      
      //to pull out menu items and display
      var body = obj.menu;
      for (var i = 0; i < body.length; i++) {
        var resultItem = body[i];
        var cartItem: any = {
          id: i + 1,
          image: resultItem.url,
          name: resultItem.name,
          price: resultItem.price,
          quantity: 1
        }
        this.inputList.push(cartItem);
      }

      // hardcoded all category
      var categoryArray = obj.categoryList;
      var all: any = {
        image: 'assets/imgs/productimages/cake.jpg',
        name: "All",
      }
      this.categories.push(all);
      //to pull out categoryList items and display 
      for (var i = 0; i < categoryArray.length; i++) {
        var resultItem = categoryArray[i];
        var cartItem: any = {
          image: 'assets/imgs/productimages/cake.jpg',
          name: resultItem,
        }
        this.categories.push(cartItem);
      }
      

      this.products = [...this.inputList];
      this.productSearch = [...this.inputList];
    }, (err) => {
      console.log(err);
    });

    
    //console.log(this.inputList);
    // array initialised when the app is run 
    
  /*  
    this.productsList = [
      { id: 1, image: 'assets/imgs/productimages/cake.jpg', desc:"chocolate cake with hazelnut", name: 'Chocolate Cake', price: 3.00, quantity: 1 },
      { id: 2, image: 'assets/imgs/productimages/food.jpg',  desc:"mexican rolls with chilli sauce", name: 'Mexican rolls', price: 6.00, quantity: 1 },
      { id: 3, image: 'assets/imgs/productimages/orange.jpg',  desc:"fresh oranges (2/set)", name: 'Orange', price: 2.00, quantity: 1 },
      { id: 4, image: 'assets/imgs/productimages/taco.jpg',  desc:"served with sauce and baked rice", name: 'Mexican Taco', price: 5.50, quantity: 1 },
      { id: 5, image: 'assets/imgs/productimages/cornflakes.jpg',  desc:"corn on a cob with butter", name: 'CornFlakes', price: 5, quantity: 1 },
      { id: 6, image: 'assets/imgs/productimages/sprite.jpg',  desc:"fresh drink", name: 'Sprite', price: 1, quantity: 1 }
    ];

    this.categories = [
      {image:'assets/imgs/productimages/cake.jpg',name:'Appetizers'},
      {image:'assets/imgs/productimages/cake.jpg',name:'Main Course'},
      {image:'assets/imgs/productimages/cake.jpg',name:'Salads'},
      {image:'assets/imgs/productimages/cake.jpg',name:'Salads'}
    ];

   */ 
    
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
      return this.inputList = this.productSearch.filter((product) => {
        return product.name.toLowerCase().indexOf(searchResult.toLowerCase()) > -1;
      });
    } else {
      return this.inputList = this.productSearch;
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
      quantity: product.quantity,
      description: product.desc
    }
    var check = 0;
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
          duration: 1000,
          position: 'top'
        });
        sucess.present(sucess);
      }
    }
    if (check == 0) {
      this.itemsAddedToCart.push(cartItem);
      let sucess = this.toast.create({
        message: 'item added',
        duration: 1000,
        position: 'top'
      });
      sucess.present(sucess);
    }
    console.log(this.itemsAddedToCart);
    this.storage.set('CartItems', this.itemsAddedToCart);

  }

  loadCheckout() {
    console.log("pushed");
    this.navCtrl.push(CartPage);
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

  retrieveOutletName() {
    var body: any;
    var outlet: any;
    var loginResponse = localStorage.getItem('userData');
    var obj = JSON.parse(loginResponse);
    body = JSON.parse(obj._body);
    outlet = body.outletName;
    return outlet;
  }

  retrieveCompanyName() {
    var body: any;
    var companyName: any;
    var loginResponse = localStorage.getItem('userData');
    var obj = JSON.parse(loginResponse);
    body = JSON.parse(obj._body);
    companyName = body.companyName;
    return companyName;
  }

  checkoutFunction() {
    this.navCtrl.push(CartPage);
  }

}



