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

import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm;
  userProfile: any = null;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(private _app: App, public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

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

  facebookLogin(){
    Facebook.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

    firebase.auth().signInWithCredential(facebookCredential)
      .then((success) => {
        console.log("Firebase success: " + JSON.stringify(success));
        this.userProfile = success;
      })
      .catch((error) => {
      console.log("Firebase failure: " + JSON.stringify(error));
    });

    }).catch((error) => { console.log(error) });
  }

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

  goToSignup(){
    this.nav.push(SignupPage);
  }

  goToResetPassword(){
    // this.nav.push(ResetPasswordPage);
  }

}
