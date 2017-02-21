import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase';

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

  user = firebase.auth().currentUser;

  isReadyToSave: boolean;

  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder, public viewCtrl: ViewController) {
    this.book = navParams.get('book');

    this.form = formBuilder.group({
      classCode: this.book.class,
      name: this.book.name,
      author: this.book.author,
      edition: this.book.edition,
      price: this.book.price,
      negotiate: this.book.negotiate
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if(!this.form.valid) { return; }
    let data = {};
    // console.log(firebase.database().ref('/users').child(this.user.uid).child("sellingBooks").child(this.book.id));
    let database = firebase.database().ref('/users').child(this.user.uid).child("sellingBooks").child(this.book.id).update({
      class: this.form.value.classCode,
      name: this.form.value.name,
      author: this.form.value.author,
      edition: this.form.value.edition,
      price: this.form.value.price,
      negotiate: this.form.value.negotiate
    });
    this.viewCtrl.dismiss(this.form.value);
  }

}
