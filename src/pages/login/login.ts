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
  confirmUser: any[] = [];
  confirmPass: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider) {
    this.userInfo = this.firebaseService.getUserDetail();
    var i = 0;
    this.userInfo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.confirmUser[i] = snapshot.val().username;
        this.confirmPass[i] = snapshot.val().password;
        i++;
        //console.log(snapshot.key, snapshot.val());
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  checkAuth(){
    for(var i=0; i<this.confirmUser.length; i++){
      for(var j=0; j<this.confirmPass.length; j++){
        if(this.tempuser == this.confirmUser[i]){
          if(this.temppass == this.confirmPass[j]){
            console.log("logged in");
            //replace console.log with navcontrol to main root page
          }
        }
      }
    }
    console.log("not logged in");
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
