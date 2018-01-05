import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  userInfo: any;
  email: any;
  fname: any;
  lname: any;
  pass: any;
  conPass: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  addUser(){
    this.userInfo = {
      "emailAddress": this.email,
      "fName": this.fname,
      "lName": this.lname,
      "password": this.pass
    }
    this.firebaseService.addUser(this.userInfo);
  }

}
