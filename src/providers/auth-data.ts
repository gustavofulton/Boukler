import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


import firebase from 'firebase';

/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {

  public fireAuth: any;
  public userProfile: any;
  public dataSize: any;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/users');
    // this.dataSize = this.count();
  }
  // count() {
  //   this.userProfile.transaction(function (dataSize) {
  //     return (dataSize || 0) + 1;
  //   });
  // }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  signupUser(email: string, firstName: string, lastName: string,  password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userProfile.child(newUser.uid).set(
          {
            email: email,
            firstName: firstName,
            lastName: lastName,
            id: 0,
            phoneNumber: "",
            school: "",
            profilePic: "http://learngroup.org/assets/images/logos/default_male.jpg",
          }
        );
      });
  }
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }
  logoutUser(): any {
    return this.fireAuth.signOut();
  }

}
