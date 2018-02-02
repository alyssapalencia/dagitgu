import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  newPass: any;
  oldPass: any;
  conPass: any;
  currUser: any;

  constructor(public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.currUser = angularFireAuth.auth.currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  sendEmail(){
    this.angularFireAuth.auth.sendPasswordResetEmail(this.currUser.email)
    .then(() => {
        console.log("email sent");
    })
  }

}
