import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TouchID } from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
    TouchID.isAvailable()
      .then(
        res => console.log('TouchID is available!'),
        err => console.error('TouchID is not available', err)
      );
      TouchID.verifyFingerprint('Scan your fingerprint please')
        .then(
          res => console.log('Ok', res),
          err => console.error('Error', err)
        );
  }



}
