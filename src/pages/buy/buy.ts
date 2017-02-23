import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BuyDetailPage } from '../buy-detail/buy-detail';

import firebase from 'firebase';

/*
  Generated class for the Buy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html'
})
export class BuyPage {
  booksRef: any;
  booksList: any;
  loadedBooksList: any;
  empty = true;

  ref = firebase.database().ref('/users');
  userId = firebase.auth().currentUser.uid;

  // sellerUserId = firebase.auth().currentUser.uid;


  constructor(public nav: NavController, public navParams: NavParams) {
    this.ref.on("value", (snapshot) => {
      let books = [];
      snapshot.forEach((childSnapshot) => {
        let sellerUserId = childSnapshot.key;
        if (sellerUserId != this.userId) {
          let sellerProfilePic = childSnapshot.val().profilePic;
          let sellerFirstName = childSnapshot.val().firstName;
          childSnapshot.child("sellingBooks").forEach((extraChildSnap) => {
            let tempVal = extraChildSnap.val();
            tempVal.id = extraChildSnap.key;
            tempVal.sellerId = sellerUserId;
            tempVal.sellerProfilePic = sellerProfilePic;
            tempVal.sellerFirstName = sellerFirstName;
              books.push(
                tempVal
              );
            return false;
          });
        }
        this.booksList = books;
        this.loadedBooksList = books;
        return false;
      });
    });
  }

  initializeItems() {
    this.booksList = this.loadedBooksList;
  }

  getItems(searchbar) {
    this.empty = false;
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      this.empty = true;
      return;
    }
    // Search by name or class
    this.booksList = this.booksList.filter((v) => {
      if(v.class && q || v.name && q) {
        if (v.class.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        } else if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  openItem(book) {
    this.nav.push(BuyDetailPage, {book: book});
  }

}
