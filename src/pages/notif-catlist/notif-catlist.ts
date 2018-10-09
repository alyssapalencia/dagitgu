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
  allNotif: FirebaseListObservable<any>;

  itemList:any = [];
  loadeditemList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public alertCtrl: AlertController) {
    this.firebaseService.limit = 15;
    this.Filter = navParams.get('param1');
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

    console.log("contructor end");
  }

  onInfiniteScroll(infiniteScroll) {
    console.log("infinite scroll method start");
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
    console.log("infinite scroll method end");
  }

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