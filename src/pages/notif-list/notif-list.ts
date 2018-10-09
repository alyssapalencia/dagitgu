import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { NotifCatPage } from '../notif-cat/notif-cat';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { FirebaseApp } from 'angularfire2';
import { Badge } from '@ionic-native/badge';
import { TabsPage } from '../tabs/tabs';
import { FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-notif-list',
  templateUrl: 'notif-list.html',
})
export class NotifListPage {
  @ViewChild(Content) content: Content;
  allNotif: FirebaseListObservable<any>;

  itemList:any = [];
  loadeditemList:any;

  constructor(public tabs: TabsPage, public badge: Badge, public firebaseApp: FirebaseApp, public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public alertCtrl: AlertController) {
    this.allNotif = this.firebaseService.getTNotif();
    this.allNotif.forEach((itemList:any) => {
      let items:any = [];
      itemList.forEach( (item:any) => {
        items.push(item);
        return false;
      });
  
      this.itemList = items;
      this.loadeditemList = items;
    });
  }

  scrollToTop() {
    this.content.scrollToTop(0);
  }

  onInfiniteScroll(infiniteScroll) {
    this.firebaseService.limit += 15;
    this.allNotif = this.firebaseService.getTNotif();
    this.allNotif.forEach((itemList:any) => {
      let items:any = [];
      itemList.forEach( (item:any) => {
        items.push(item);
        return false;
      });
  
      this.itemList = items;
      this.loadeditemList = items;
  
      infiniteScroll.state = "closed";
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifListPage');
  }

  ionViewDidEnter(){
    this.clearBadges();
    this.tabs.getBadges();
    this.scrollToTop();
  }

  async clearBadges(){
    try{
      let badge = await this.badge.clear();
    }
    catch(e){
      console.error(e);
    }
  }

  btn_cat(){
    this.navCtrl.push(NotifCatPage);
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