import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Keyboard, ToastController } from 'ionic-angular';

import firebase from 'firebase';



@Component({
  selector: 'page-first-message',
  templateUrl: 'first-message.html'
})
export class FirstMessagePage {

  user = firebase.auth().currentUser;
  userName: any;
  profilePic: any;

  message="";

  book: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public keyboard: Keyboard, public toastCtrl: ToastController) {
    //Get book parameters to see who posted it
    this.book = navParams.get('book');
    console.log(this.user);

    //Get current user info
    firebase.database().ref('users/' + this.user.uid).once('value').then( (data) => {
      this.userName = data.val().firstName;
      this.profilePic = data.val().profilePic;
    });
  }
  ionViewDidLoad() {
    // get elements
    let element   = document.getElementById('messageInputBox');

    // apply new style
    element.style.height      = "21px";
    element.style.minHeight = "21px";
  }

  sendMessage(message) {
    let myDate: String = new Date().toString();
    if (message != "") {
      //Put message in sender user
      firebase.database().ref('/users').child(this.user.uid).child("messages").push({
        message: this.message,
        from: this.userName,
        fromId: this.user.uid,
        fromProfilePic: this.profilePic,
        to: this.book.sellerFirstName,
        toId: this.book.sellerId,
        toProfilePic: this.book.sellerProfilePic,
        person: this.book.sellerId,
        time: myDate
      });

      //Put message in the receiver user
      firebase.database().ref('/users').child(this.book.sellerId).child("messages").push({
        message: this.message,
        from: this.userName,
        fromId: this.user.uid,
        fromProfilePic: this.profilePic,
        to: this.book.sellerFirstName,
        toId: this.book.sellerId,
        toProfilePic: this.book.sellerProfilePic,
        person: this.user.uid,
        time: myDate
      });

      let toast = this.toastCtrl.create({
        message: 'Message Sent!',
        position: 'top',
        duration: 3000
      });
      toast.present();
      this.dismiss();
    }
  }

  isEmpty() {
    if (this.message == "") {
      return true;
    }
    return false;
  }

  change() {
    // get elements
    let element   = document.getElementById('messageInputBox');

    // set default style for textarea
    element.style.minHeight = "0";
    element.style.height = "0";

    // limit size to 96 pixels (6 lines of text)
    let scroll_height = element.scrollHeight;

    if(scroll_height > 96)
      scroll_height = 96;

    // apply new style
    element.style.height      = scroll_height + "px";
    element.style.minHeight = scroll_height + "px";
  }

  keyboardClose() {
    this.keyboard.close();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
