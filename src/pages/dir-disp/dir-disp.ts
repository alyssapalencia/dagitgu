import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';

@IonicPage()
@Component({
  selector: 'page-dir-disp',
  templateUrl: 'dir-disp.html',
})
export class DirDispPage {
  Filter: any;
  dirInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider) {
    this.Filter = navParams.get('param1');
    this.dirInfo = this.firebaseService.getDirectory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirDispPage');
  }

}
