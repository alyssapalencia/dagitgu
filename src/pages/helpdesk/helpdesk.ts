import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-helpdesk',
  templateUrl: 'helpdesk.html',
})
export class HelpdeskPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpdeskPage');
  }

  openContact() {
    this.navCtrl.push('ContactPage');
  }

  openAccident() {
    this.navCtrl.push('AccidentPage');
  }

  openViolation() {
    this.navCtrl.push('ViolationPage');
  }

  openPedicab() {
    this.navCtrl.push('PedicabPage');
  }
}
