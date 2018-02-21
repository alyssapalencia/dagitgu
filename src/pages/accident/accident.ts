import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

declare var google;

@IonicPage()
@Component({
  selector: 'page-accident',
  templateUrl: 'accident.html',
})
export class AccidentPage {
  @ViewChild('autocomplete') autocompleteElement: ElementRef;
  autocomplete;
  element: any;

  today = new Date();
  accidentInfo: any;
  aLocation: any;
  accidentDescription: any;
  user: any;
  
  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.user = this.angularFireAuth.auth.currentUser;
    this.aLocation = '';
    console.log(this.aLocation);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccidentPage');
    console.log(moment().format('MM/DD/YYYY hh:mm:ss A').toString()); //to check moment.js

    var options = {
      componentRestrictions: {country: "phl"}
    }

    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteElement.nativeElement, options);
  }

  addAccidentReport() {
    this.aLocation = document.getElementById('autocomplete')["value"];
    console.log(this.aLocation);

    this.accidentInfo = {
      "reportSender": this.user.displayName,
      "location": this.aLocation,
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
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

