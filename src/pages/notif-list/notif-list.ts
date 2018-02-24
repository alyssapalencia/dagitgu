import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NotifCatPage } from '../notif-cat/notif-cat';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { FirebaseApp } from 'angularfire2';
import { Badge } from '@ionic-native/badge';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-notif-list',
  templateUrl: 'notif-list.html',
})
export class NotifListPage {
  notifInfo: any;
  badges: any;

  constructor(public tabs: TabsPage, public badge: Badge, public firebaseApp: FirebaseApp, public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public alertCtrl: AlertController) {
    this.notifInfo = this.firebaseService.getTNotif();
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifListPage');
  }

  ionViewDidEnter(){
    this.clearBadges();
    this.tabs.getBadges();
  }

  async clearBadges(){
    try{
      let badge = await this.badge.clear();
      let alert = this.alertCtrl.create({
        title: String(badge),
        buttons: ['OK']
      });
      alert.present();
      console.log(badge);
    }
    catch(e){
      console.error(e);
    }
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

