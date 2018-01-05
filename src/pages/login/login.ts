import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  tempuser: any;
  temppass: any;
  temp: any;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider) {
    this.userInfo = this.firebaseService.getUserDetail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  checkAuth(){
    for(var info in this.userInfo){
      this.temp = this.userInfo.fName;
      console.log(this.temp);
    }
  }

  openRegister() {
    this.navCtrl.push('RegisterPage');
  }

  //Redirect to main menu after logging in
  MainMenu() {
    this.navCtrl.setRoot('TabsPage');
    this.navCtrl.popToRoot();
  }
}
