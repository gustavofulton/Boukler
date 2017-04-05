import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  messages= [];
  chats = [];

  userId = firebase.auth().currentUser.uid;

  ref = firebase.database().ref('/users').child(this.userId).child("messages");

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.initializeChats();
  }
  ionViewDidLoad() {
      this.initializeChats();
  }

  initializeChats() {
        //Reads every single message from current user and insert them into messages
    this.ref.orderByChild("fromId").on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let tempVal = childSnapshot.val();
        this.messages.push(tempVal);
        return false;
      });
    });

    //Sort message by who sent them
    this.messages.sort(function(a,b) {
      return (a.person < b.person) ? 1 : ((b.person > a.person) ? -1 : 0);
    });

    //Check with how many users the current user has communicated with and make different chats for each one of them
    this.chats.push(this.messages[0]);
    for (var i = 1; i < this.messages.length; i++) {
      if (this.messages[i-1].person != this.messages[i].person) {
        this.chats.push(this.messages[i]);
      }
    }
    console.log(this.messages);
    console.log(this.chats);
    //Sort chat by most recent
    this.chats.sort(function(a,b) {
      return (a.time < b.time) ? 1 : ((b.time > a.time) ? -1 : 0);
    });

    //Get who the person in the chat is
    for (var i = 0; i < this.chats.length; i++) {
      if (this.chats[i].fromId == this.userId) {
        this.chats[i].chatName = this.chats[i].to;
        this.chats[i].chatProfile = this.chats[i].toProfilePic;
      } else {
        this.chats[i].chatName = this.chats[i].from;
        this.chats[i].chatProfile = this.chats[i].fromProfilePic;
      }
    }

  }
}
