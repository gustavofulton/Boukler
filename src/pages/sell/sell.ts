import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { SellDetailPage } from '../sell-detail/sell-detail';
import { SellCreatePage } from '../sell-create/sell-create';

import firebase from 'firebase';

/*
  Generated class for the Sell page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html'
})
export class SellPage {
  books: any[] = [];
  user = firebase.auth().currentUser;
  ref = firebase.database().ref('/users').child(this.user.uid).child("sellingBooks");

  constructor(public nav: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.ref.orderByChild("class").once("value", (snapshot) => {
      this.books = [];
      snapshot.forEach((childSnapshot) => {
        let tempVal = childSnapshot.val();
        tempVal.id = childSnapshot.key;
          this.books.push(
            tempVal
          );
          return false;
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  loadValues() {
    this.ref.orderByChild("class").on("value", (snapshot) => {
      this.books = [];
      snapshot.forEach((childSnapshot) => {
        let tempVal = childSnapshot.val();
        tempVal.id = childSnapshot.key;
        // console.log(tempVal);
          this.books.push(
            tempVal
          );
          return false;
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  ionViewDidLoad() {
      this.loadValues();
  }

  deleteBook(book) {
    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: "Are you sure you want to delete this book? This action can't be undone",
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.ref.child(book.id).remove();
          }
        }
      ]
    });
    confirm.present();
  }

  addSellingBook() {
    let addModal = this.modalCtrl.create(SellCreatePage);
    addModal.onDidDismiss(item => {

    })
    addModal.present();
  }


  openItem(book) {
    this.nav.push(SellDetailPage, {book: book});
  }

}
