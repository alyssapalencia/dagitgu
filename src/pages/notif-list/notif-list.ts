import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NotifCatPage } from '../notif-cat/notif-cat';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';


@IonicPage()
@Component({
  selector: 'page-notif-list',
  templateUrl: 'notif-list.html',
})
export class NotifListPage {
  notifInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public alertCtrl: AlertController) {
    this.notifInfo = this.firebaseService.getTNotif();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifListPage');
  }

  btn_cat(){
    this.navCtrl.push(NotifCatPage);
    console.log ("Category button clicked");
  }

  dispDetails(notif) {
    console.log('Clicked');
    let alert = this.alertCtrl.create({
      title: notif.title,
      subTitle: notif.notifDetail,
      buttons: ['OK']
    });
    alert.present();
  }
}

