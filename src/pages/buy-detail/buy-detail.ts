import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.book = navParams.get('book');
  }

  ionViewDidLoad() {
    console.log(this.book);
  }

}
