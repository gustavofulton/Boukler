import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.name = navParams.get('name');
    this.class = navParams.get('class');
    console.log(this.class);
    this.message = "Hey, I'm interested in the book " + this.name + " for " + this.class + "!";
  }
  ionViewDidLoad() {
    // get elements
    let element   = document.getElementById('messageInputBox');
    // let textarea  = element.getElementsByTagName('textarea')[0];

    // apply new style
    element.style.height      = "84px";
    element.style.minHeight = "84px";
    // textarea.style.minHeight  = "84px";
    // textarea.style.height     = "84px";
  }

  sendMessage(message) {
    if (message != "") {
      this.messages.push(message);
      this.message="";
      let element   = document.getElementById('messageInputBox');
      // let textarea  = element.getElementsByTagName('textarea')[0];

      element.style.height= "21px";
      element.style.minHeight = "21px";
      // textarea.style.minHeight = "21px";
      // textarea.style.height = "21px";
    }
  }

  change() {
    // get elements
    let element   = document.getElementById('messageInputBox');
    // let textarea  = element.getElementsByTagName('textarea')[0]   ;

    // set default style for textarea
    element.style.minHeight = "0";
    element.style.height = "0";
    // textarea.style.minHeight  = '0';
    // textarea.style.height     = '0';

    // limit size to 96 pixels (6 lines of text)
    let scroll_height = element.scrollHeight;
    console.log(scroll_height);

    if(scroll_height > 96)
      scroll_height = 96;

    // apply new style
    element.style.height      = scroll_height + "px";
    element.style.minHeight = scroll_height + "px";
    // textarea.style.minHeight  = scroll_height + "px";
    // textarea.style.height     = scroll_height + "px";
}

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
