import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SellDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sell-detail',
  templateUrl: 'sell-detail.html'
})
export class SellDetailPage {
  book: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.book = navParams.get('book');
    console.log(this.book);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellDetailPage');
  }

}
