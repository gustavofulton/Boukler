import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase';

/*
  Generated class for the SellCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sell-create',
  templateUrl: 'sell-create.html'
})
export class SellCreatePage {

  user = firebase.auth().currentUser;

  userSchool: any;

  isReadyToSave: boolean;

  form: FormGroup;

  starCountRef = firebase.database().ref('users/' + this.user.uid).once('value').then( (data) => {
    this.userSchool = data.val().school;
  });

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      classCode: ['', Validators.required],
      name: ['', Validators.required],
      author: [''],
      edition: [''],
      price: ['', Validators.required],
      negotiate: true
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

    firebase.database().ref('/users').child(this.user.uid).child("sellingBooks").push({
      class: this.form.value.classCode,
      name: this.form.value.name,
      author: this.form.value.author,
      edition: this.form.value.edition,
      price: this.form.value.price,
      negotiate: this.form.value.negotiate
    });

    // firebase.database().ref('schools/').child(this.userSchool).push({
    //   seller: this.user.uid,
    //   class: this.form.value.classCode,
    //   name: this.form.value.name,
    //   author: this.form.value.author,
    //   edition: this.form.value.edition,
    //   price: this.form.value.price,
    //   negotiate: this.form.value.negotiate
    // });
    this.viewCtrl.dismiss(this.form.value);
  }
}
