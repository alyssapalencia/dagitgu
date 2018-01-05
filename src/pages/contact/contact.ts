import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider) {
    this.Chat = this.firebaseService.getMessage();
    console.log(this.Chat);
    this.user = this.firebaseService.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendMessage(){
    console.log(this.message);
    this.messageObject = {
      message: this.message,
      user: this.user
    }
    this.firebaseService.addMessage(this.messageObject);
  }
}
