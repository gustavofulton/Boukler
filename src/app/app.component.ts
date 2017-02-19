import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;


  @ViewChild(Nav) nav: Nav;

  zone: NgZone;
  constructor(platform: Platform) {
    firebase.initializeApp({
      apiKey: "AIzaSyAzOR2Ky-BMBR8GsfyNaqsH8BCaemuu43k",
      authDomain: "bookler-45168.firebaseapp.com",
      databaseURL: "https://bookler-45168.firebaseio.com",
      storageBucket: "bookler-45168.appspot.com",
      messagingSenderId: "1062030417489"
    });
    // let maybeUser = firebase.auth().currentUser;
    // let credential;
    // if (maybeUser) {
    //   maybeUser.reauthenticate(credential).then(function() {
    //       // User re-authenticated.
    //       console.log("success");
    //     }, function(error) {
    //       console.log("error");
    //       // An error happened.
    //   });
    // }


    // console.log(maybeUser);
    // if (!maybeUser) {
    //   this.rootPage = LoginPage;
    // } else {
    //   this.rootPage = TabsPage;
    // }

    this.zone = new NgZone({});
    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = LoginPage;
          console.log("There's not a logged in user!");
        } else {
          this.rootPage = TabsPage;
        }
      });
    });

    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
