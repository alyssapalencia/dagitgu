import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';

@IonicPage()
@Component({
  selector: 'page-notif-catlist',
  templateUrl: 'notif-catlist.html',
})
export class NotifCatlistPage {
  Filter: any;
  notifInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public alertCtrl: AlertController) {
    this.Filter = navParams.get('param1');
    this.notifInfo = this.firebaseService.getTNotif();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifCatlistPage');
  }

  dispDetails(notif) {
    let alert = this.alertCtrl.create({
      title: notif.title,
      subTitle: notif.notifDetail,
      buttons: ['OK']
    });
    alert.present();
  }
}