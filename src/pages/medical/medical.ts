import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';

@IonicPage()
@Component({
  selector: 'page-medical',
  templateUrl: 'medical.html',
})
export class MedicalPage {
  Filter: any;
  directory: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider) {
    this.Filter = navParams.get('param1');
    this.directory = this.firebaseService.getDirectory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalPage');
  }

}
