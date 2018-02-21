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
  isEnabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public angularFireAuth: AngularFireAuth) {
    this.user = this.angularFireAuth.auth.currentUser;
    console.log(this.user.displayName);
    this.Chat = this.firebaseService.getMessage(this.user.displayName);
    console.log(this.Chat);
    console.log(this.user.accountPicture);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendMessage() {
    console.log(this.message);

    this.messageObject = {
      "messageSender": this.user.displayName,
      "timeStamp": moment().format('MMMM Do YYYY, hh:mm A'),
      message: this.message
    }
    this.firebaseService.addMessage(this.messageObject, this.user.displayName);
    this.message = '';
  }

  /* disable button if this.message = ''
  sendMessage(){
    console.log(this.message);

    if(this.message != '') {
      this.messageObject = {
        "messageSender": this.user.displayName,
        "timeStamp": moment().format('MMMM Do YYYY, hh:mm A'),
        message: this.message
      }
      this.firebaseService.addMessage(this.messageObject, this.user.displayName);
      this.message = '';
      this.isEnabled = true;
    } else {
      console.log("No message inputted");
      this.isEnabled = false;
    }
  }
  */
}
