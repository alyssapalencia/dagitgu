import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-accident',
  templateUrl: 'accident.html',
})
export class AccidentPage {
  today = new Date();
  accidentInfo: any;
  location: any;
  accidentDescription: any;
  user: any;
  
  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.user = this.angularFireAuth.auth.currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccidentPage');
    console.log(moment().format('MM/DD/YYYY hh:mm:ss A').toString()); //to check moment.js
  }

  addAccidentReport() {
    this.accidentInfo = {
      "reportSender": this.user.displayName,
      "location": this.location,
      "accidentDescription": this.accidentDescription,
      "timeStamp": moment().format('MM/DD/YYYY hh:mm:ss A').toString()
    }
    this.firebaseService.addAccidentReport(this.accidentInfo);
    let alert = this.alertCtrl.create({
      title: 'Report Sent',
      subTitle: 'Your report was sent to our Helpdesk. Thank you for your contribution.',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push('HelpdeskPage');
  }
}

