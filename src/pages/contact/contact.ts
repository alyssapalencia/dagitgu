import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/dagit-provider';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  message: any;
  messageObject: any;
  Chat: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService) {
    this.Chat = this.firebaseService.getMessage();
    console.log(this.Chat);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendMessage(){
    console.log(this.message);
    this.messageObject = {
      message: this.message,
      user: 'ling'
    }
    this.firebaseService.addMessage(this.messageObject);
  }
}
