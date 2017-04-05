import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Keyboard, ToastController, TextInput } from 'ionic-angular';

/*
  Generated class for the FirstMessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-first-message',
  templateUrl: 'first-message.html'
})
export class FirstMessagePage {
  message="";
  messages = [];
  name : string;
  class : string;

  @ViewChild('messageInputBox') messageInput: TextInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public keyboard: Keyboard, public toastCtrl: ToastController) {
    this.name = navParams.get('name');
    this.class = navParams.get('class');
  }
  ionViewDidLoad() {
    // get elements
    let element   = document.getElementById('messageInputBox');

    // apply new style
    element.style.height      = "21px";
    element.style.minHeight = "21px";
  }

  sendMessage(message) {
    if (message != "") {

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
