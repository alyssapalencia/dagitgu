import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

declare var google;

@IonicPage()
@Component({
  selector: 'page-violation',
  templateUrl: 'violation.html',
})
export class ViolationPage {
  @ViewChild('autocomplete') autocompleteElement: ElementRef;
  autocomplete;
  element: any;

  today = new Date();
  violationInfo: any;
  vLocation: any;
  reportContent: any;
  vehicleType: any;
  plateNumber: any;
  color: any;
  model: any;
  user: any;

  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.user = this.angularFireAuth.auth.currentUser;
    this.vLocation = '';
    console.log(this.vLocation);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViolationPage');
    console.log(moment().format('MM/DD/YYYY hh:mm:ss A').toString()); //to check moment.js

    var options = {
      componentRestrictions: {country: "phl"}
    }

    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteElement.nativeElement, options);
  }

  addViolationReport() {
    this.vLocation = document.getElementById('autocomplete')["value"];

    this.violationInfo = {
      "reportSender": this.user.displayName,
      "location": this.vLocation,
      "reportContent": this.reportContent,
      "vehicleType": this.vehicleType,
      "plateNumber": this.plateNumber,
      "color": this.color,
      "model": this.model,
      "timeStamp": moment().format('MM/DD/YYYY hh:mm:ss A').toString()
    }
    this.firebaseService.addViolationReport(this.violationInfo);
    let alert = this.alertCtrl.create({
      title: 'Report Sent',
      subTitle: 'Your report was sent to our Helpdesk. Thank you for your contribution.',
      buttons: ['OK']
    });
    alert.present();
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
