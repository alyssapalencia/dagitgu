import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DirectoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
})
export class DirectoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryPage');
  }

  openPolice() {
    this.navCtrl.push('PolicePage');
  }

  openMedical() {
    this.navCtrl.push('MedicalPage');
  }

  openFire() {
    this.navCtrl.push('FirePage');
  }

  openTerminals() {
    this.navCtrl.push('TerminalsPage');
  }

}
