import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
//import * as moment from 'moment';

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

  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.user = this.angularFireAuth.auth.currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedicabPage');
  }

  addPedicabReport() {
    this.pedicabInfo = {
      "reportSender": this.user.displayName,
      "pedicabNumber": this.pedicabNumber,
      "violationType": this.violationType
      //"timeStamp": moment().format('MM/DD/YYYY hh:mm:ss A').toString()
    }
    this.firebaseService.addPedicabReport(this.pedicabInfo);
    let alert = this.alertCtrl.create({
      title: 'Report Sent',
      subTitle: 'Your report was sent to our Helpdesk. Thank you for your contribution.',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push('HelpdeskPage');
  }
}
