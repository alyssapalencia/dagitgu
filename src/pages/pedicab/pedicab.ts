import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-pedicab',
  templateUrl: 'pedicab.html',
})
export class PedicabPage {
  today = new Date();
  pedicabInfo: any;
  pedicabNumber: any;
  violationType: any;
  user: any;

  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.user = this.angularFireAuth.auth.currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedicabPage');
  }

  addPedicabReport() {
    if(!this.isBlank(this.user.displayName) && !this.isBlank(this.pedicabNumber) && !this.isBlank(this.violationType)){
      this.pedicabInfo = {
        "reportSender": this.user.displayName,
        "pedicabNumber": this.pedicabNumber,
        "violationType": this.violationType,
        "timeStamp": moment().format('MMMM Do YYYY, hh:mm A').toString(),
        "status": "unread",
        "sort": 0 - Date.now()
      }
      this.firebaseService.addPedicabReport(this.pedicabInfo);
      let alert = this.alertCtrl.create({
        title: 'Report Sent',
        subTitle: 'Your report was sent to our Helpdesk. Thank you for your contribution.',
        buttons: ['OK']
      });
      alert.present();
      this.viewCtrl.dismiss();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Missing Information',
        subTitle: 'Please fill up the form and try again.',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  isBlank(str){
    if(!str || 0 === str.length){
      return true;
    }else if(str.trim().length == 0){
      return true;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}