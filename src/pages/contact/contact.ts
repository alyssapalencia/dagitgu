import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  @ViewChild (Content) content: Content;
  user: any;
  message: any;
  messageObject: any;
  Chat: any;
  key: any; // FOR AUTOSCROLL
  isEnabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public angularFireAuth: AngularFireAuth, public firebaseApp: FirebaseApp) {
    this.user = this.angularFireAuth.auth.currentUser;
    this.Chat = this.firebaseService.getMessage(this.user.displayName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  ionViewDidEnter() {
    /*var chatKey;

    chatKey = {
      "key": this.Chat.$key
    }*/

    setTimeout(() => {
      this.content.scrollToBottom(300);
    });

    this.firebaseApp.database().ref("CHAT/" + this.key + "/message").on('value', snapshot => {
      setTimeout(() => {
        this.content.scrollToBottom(300);
      });
    });
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    });
  }

  sendMessage() {

    this.messageObject = {
      "messageSender": this.user.displayName,
      "timeStamp": moment().format('MMM Do YYYY, hh:mm A'),
      message: this.message
    }
    this.firebaseService.updateStatus(this.user);
    this.firebaseService.addMessage(this.messageObject, this.user.displayName);
    this.message = '';
  }
}
