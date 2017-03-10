import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { FirstMessagePage } from '../first-message/first-message'

/*
  Generated class for the BuyDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buy-detail',
  templateUrl: 'buy-detail.html'
})
export class BuyDetailPage {
  book: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.book = navParams.get('book');
  }

  ionViewDidLoad() {
    console.log(this.book);
  }

  sendMessage() {
    let messageModal = this.modalCtrl.create(FirstMessagePage, {name: this.book.name, class: this.book.class});
    messageModal.present();
  }

}
