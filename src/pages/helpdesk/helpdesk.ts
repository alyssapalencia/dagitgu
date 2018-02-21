import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-helpdesk',
  templateUrl: 'helpdesk.html',
})
export class HelpdeskPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpdeskPage');
  }

  openContact() {
    this.navCtrl.push('ContactPage');
  }

  openAccident() {
    let modal = this.modalCtrl.create('AccidentPage');
    modal.present();
  }

  openViolation() {
    let modal = this.modalCtrl.create('ViolationPage');
    modal.present();
  }

  openPedicab() {
    let modal = this.modalCtrl.create('PedicabPage');
    modal.present();
  }
}
