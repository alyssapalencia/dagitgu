import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  user: any;
  message: any;
  messageObject: any;
  Chat: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public angularFireAuth: AngularFireAuth) {
    //this.user = this.angularFireAuth.auth.currentUser.displayName; //comment again
    this.user = this.angularFireAuth.auth.currentUser;
    console.log(this.user.displayName);
    this.Chat = this.firebaseService.getMessage();
    console.log(this.Chat);
    this.user = this.firebaseService.getUser(); //comment again
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendMessage(){
    console.log(this.message);
    this.messageObject = {
      "messageSender": this.user.displayName,
      "timeStamp": moment().format('ddd, hh:mm A'),
      "timeSent": moment().format('MM/DD/YYYY hh:mm:ss A'),
      message: this.message,
      user: this.user //comment again
    }
    this.firebaseService.addMessage(this.messageObject);
    this.message = '';
  }
}
