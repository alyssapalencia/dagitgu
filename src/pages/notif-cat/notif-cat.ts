import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NotifCatlistPage} from '../notif-catlist/notif-catlist';

@IonicPage()
@Component({
  selector: 'page-notif-cat',
  templateUrl: 'notif-cat.html',
})
export class NotifCatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifCatPage');
  }

  btn_anc(filter){
    this.navCtrl.push(NotifCatlistPage, {param1: filter});
  }

  btn_park(filter){
    this.navCtrl.push(NotifCatlistPage, {param1: filter});
  }

  btn_traffic(filter){
    this.navCtrl.push(NotifCatlistPage, {param1: filter});
  }
}