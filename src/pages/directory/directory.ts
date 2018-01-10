import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DirDispPage } from '../dir-disp/dir-disp';

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

  btnPolice(filter) {
    this.navCtrl.push(DirDispPage, {param1: filter});
    console.log('Police button clicked');
  }

  btnMedical(filter) {
    this.navCtrl.push(DirDispPage, {param1: filter});
    console.log('Medical button clicked');
  }

  btnFire(filter) {
    this.navCtrl.push(DirDispPage, {param1: filter});
    console.log('Fire button clicked');
  }

  btnTerminal(filter) {
    this.navCtrl.push(DirDispPage, {param1: filter});
    console.log('Terminal button clicked');
  }

}
