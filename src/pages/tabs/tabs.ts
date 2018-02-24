import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { FirebaseApp} from 'angularfire2';
import { Badge } from '@ionic-native/badge';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'MapPage';
  tab2Root = 'DirectoryPage';
  tab3Root = 'NotifListPage';
  tab4Root = 'HelpdeskPage';
  tab5Root = 'MorePage';

  first = true;
  bdge: any;

  constructor(public navCtrl: NavController, public badge: Badge, public firebaseService: ProviderDagitProvider, public firebaseApp: FirebaseApp, public alertCtrl: AlertController) {
    this.firebaseApp.database().ref("NOTIFICATIONS/").on('value', snapshot => {
      if(!this.first){
        this.increaseBadges();
      }
      else{
        this.getBadges();
        this.first = false;
      }
    });
  }

  async getBadges(){
    try{
      let badgeAmount = await this.badge.get();
      if(badgeAmount != 0){
        this.bdge = badgeAmount;
      }
      else{
        this.bdge = "";
      }
    }
    catch (e){
      console.error(e);
    }
  }

  async increaseBadges(){
    try{
      let badge = await this.badge.increase(Number(1));
      this.bdge = badge;
      let alert = this.alertCtrl.create({
        title: String(this.bdge),
        buttons: ['OK']
      });
      alert.present();
      console.log(badge);
    }
    catch (e){
      console.error(e);
    }
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
}
