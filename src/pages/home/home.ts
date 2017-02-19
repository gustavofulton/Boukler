import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data';

import { LoginPage } from '../login/login';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = firebase.auth().currentUser;
  constructor(public nav: NavController, private authData: AuthData) {
    // console.log(nav);
    // this.authData.logoutUser().then( authData => {
    //   this.nav.setRoot(LoginPage);
    // });
  }
  logoutUser() {
    this.authData.logoutUser().then( authData => {
      this.nav.setRoot(LoginPage);
    });
  }

}
