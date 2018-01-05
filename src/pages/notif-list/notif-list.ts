import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotifCatPage } from '../notif-cat/notif-cat';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';


@IonicPage()
@Component({
  selector: 'page-notif-list',
  templateUrl: 'notif-list.html',
})
export class NotifListPage {

  notifInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider) {
    this.notifInfo = this.firebaseService.getTNotif();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifListPage');
  }

  btn_cat(){
    this.navCtrl.push(NotifCatPage);
    console.log ("Category button clicked");
  }
}
