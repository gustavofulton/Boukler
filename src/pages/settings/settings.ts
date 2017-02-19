import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { App } from 'ionic-angular';

import { LoginPage } from '../login/login';

import firebase from 'firebase';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
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
