import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
//import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-violation',
  templateUrl: 'violation.html',
})
export class ViolationPage {
  today = new Date();
  violationInfo: any;
  location: any;
  reportContent: any;
  vehicleType: any;
  plateNumber: any;
  color: any;
  model: any;
  user: any;

  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.user = this.angularFireAuth.auth.currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViolationPage');
  }

  addViolationReport() {
    this.violationInfo = {
      "reportSender": this.user.displayName,
      "location": this.location,
      "reportContent": this.reportContent,
      "vehicleType": this.vehicleType,
      "plateNumber": this.plateNumber,
      "color": this.color,
      "model": this.model
      //"timeStamp": moment().format('MM/DD/YYYY hh:mm:ss A').toString()
    }
    this.firebaseService.addViolationReport(this.violationInfo);
    let alert = this.alertCtrl.create({
      title: 'Report Sent',
      subTitle: 'Your report was sent to our Helpdesk. Thank you for your contribution.',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push('HelpdeskPage');
  }
}
