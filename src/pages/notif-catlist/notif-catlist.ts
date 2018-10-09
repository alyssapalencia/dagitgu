import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-notif-catlist',
  templateUrl: 'notif-catlist.html',
})
export class NotifCatlistPage {
  @ViewChild(Content) content: Content;
  Filter: any;
  notifInfo: FirebaseListObservable<any>;

  itemList:any = [];
  loadeditemList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public alertCtrl: AlertController) {
    this.Filter = navParams.get('param1');
    this.notifInfo = this.firebaseService.getTNotif();
    this.notifInfo.forEach((itemList:any) => {
      let items:any = [];
      itemList.forEach( (item:any) => {
        items.push(item);
        return false;
      });
  
      this.itemList = items;
      this.loadeditemList = items;
    });
  }

  /*onInfiniteScroll(infiniteScroll) {
    this.firebaseService.limit += 15;
    this.notifInfo = this.firebaseService.getTNotif();
    this.notifInfo.forEach((itemList:any) => {
      let items:any = [];
      itemList.forEach( (item:any) => {
        items.push(item);
        return false;
      });
  
      this.itemList = items;
      this.loadeditemList = items;
  
      infiniteScroll.state = "closed";
    });
  }*/

  scrollToTop() {
    this.content.scrollToTop(0);
  }

  ionViewDidEnter(){
    this.scrollToTop();
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