import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SettingsPage} from '../settings/settings'
import firebase from 'firebase';


/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  firstName: string;
  lastName: string;
  school: any;
  email: any;
  mirror = this;

  userId = firebase.auth().currentUser.uid;

  starCountRef = firebase.database().ref('users/' + this.userId).once('value').then( (data) => {
    // let firsts = data.val().school;
    this.firstName = data.val().firstName;
    this.lastName = data.val().lastName;
    this.school = data.val().school;
    // this.user.firstName = snapshot.val().firstName;
    // console.log(this.lastName);

  });


  // school = this.user.school;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  goSettings() {
    this.navCtrl.push(SettingsPage);
  }



}
