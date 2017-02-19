import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { App } from 'ionic-angular';

import { LoginPage } from '../login/login';

import firebase from 'firebase';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  user = firebase.auth().currentUser;

  constructor(private _app: App, public nav: NavController, private authData: AuthData) {
  }

  logoutUser() {
    this.authData.logoutUser().then( () => {
      this._app.getRootNav().setRoot(LoginPage);
      // root.rootPage = LoginPage;
      // this.rootPage = LoginPage;
      // console.log(this.nav.length());
      // this.nav.setRoot(LoginPage);
    });
  }

}
