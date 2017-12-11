import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';

/**
 * Generated class for the NotifCatlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notif-catlist',
  templateUrl: 'notif-catlist.html',
})
export class NotifCatlistPage {
  Filter: any;
  notifInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider) {
    this.Filter = navParams.get('param1');
    this.notifInfo = this.firebaseService.getTNotif();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifCatlistPage');
  }

}
