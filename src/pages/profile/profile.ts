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
//   getPicture() {
//     let base64Picture;
//     let options = {
//         destinationType: 0,
//         sourceType: 0, 
//         encodingType:0
//     };
//
//     let promise = new Promise((resolve, reject) => {
//          Camera.getPicture(options).then((imageData) => {
//               base64Picture = "data:image/jpeg;base64," + imageData;
//               resolve(base64Picture);
//           }, (error) => {
//               reject(error);
//         });
//
//     });
//     return promise;
// }
//
// // Update Provide Picture of User
// updatePicture() {
//   this.getUid().then(uid => {
//     let pictureRef =
//      this.af.database.object(`/users/${uid}/picture`);
//     this.getPicture()
//     .then((image) => {
//         pictureRef.set(image);
//     });
//   });
// }



}
