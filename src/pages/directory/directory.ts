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
  }

  btnMedical(filter) {
    this.navCtrl.push(DirDispPage, {param1: filter});
  }

  btnFire(filter) {
    this.navCtrl.push(DirDispPage, {param1: filter});
  }

  btnTerminal(filter) {
    this.navCtrl.push(DirDispPage, {param1: filter});
  }
}