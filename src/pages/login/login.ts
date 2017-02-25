import {
  NavController,
  LoadingController,
  AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';
import {ChoosecolPage} from '../choosecol/choosecol'
// import { ResetPasswordPage } from '../reset-password/reset-password';
import { MainPage } from '../../pages/pages';
import { Facebook } from 'ionic-native';
import { GooglePlus } from 'ionic-native';

import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  FB_APP_ID: number = 416882581978909;
  public loginForm;
  userProfile: any = null;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(private _app: App, public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
      Facebook.browserInit(this.FB_APP_ID, "v2.8");

    /**
     * Creates a ControlGroup that declares the fields available, their values and the validators that they are going
     * to be using.
     *
     * I set the password's min length to 6 characters because that's Firebase's default, feel free to change that.
     */
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6),
        Validators.required])]
    });
  }

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  // Email login user
  loginUser(){

    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {

        // this._app.getRootNav().setRoot(TabsPage);
        // console.log(this._app.getRootNav());
        this.nav.push(TabsPage);
        // this.loading.dismiss();
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: 'Logging in...'
      });
      this.loading.present();
    }
  }

  facebookLogIn() {
    let permissions = new Array();
    //the permissions your facebook app needs from the user
    permissions = ["public_profile", "email"];
    Facebook.login(permissions)
      .then(function(response) {

        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));

            // Getting Facebook user information
            let userId = response.authResponse.userID;
            let params = new Array();
            Facebook.api("/me?fields=name,gender", params)
            .then(function(user) {
              user.picture = "https://graph.facebook.com/" + userId + "/picture?width=1000&height=1000";
              let fireId = firebase.auth().currentUser.uid;
              let ref = firebase.database().ref('/users');
              ref.child(fireId).set(
                {
                  email: success.email,
                  firstName: success.displayName,
                  lastName: "",
                  id: 0,
                  phoneNumber: "",
                  school: "Michigan State University",
                  profilePic: user.picture
                }
              );
            })
          })
          .catch((error) => {
          console.log("Firebase failure: " + JSON.stringify(error));
        });

      }, function(error){
        alert(error);
    });
  }

  goToSignup(){
    this.nav.push(SignupPage);
  }

  goToResetPassword(){
    // this.nav.push(ResetPasswordPage);
  }

}
