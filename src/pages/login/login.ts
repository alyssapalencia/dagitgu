import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public toastCtrl: ToastController) {
    this.userInfo = this.firebaseService.getUserDetail();
    var i = 0;
    this.userInfo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.confirmUser[i] = snapshot.val().username;
        this.confirmPass[i] = snapshot.val().password;
        i++;
      });
    });
  }

  sendEmailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
      });
  }

  login(username, password) {
    var noError = true;

    console.log(username, password);
    this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
    .catch(function(error){
      var errorCode = error.code;
      console.log(errorCode);
      if(errorCode === 'auth/invalid-email'){
        console.log('invalid email');
        noError = false;
      }
      else if(errorCode === 'auth/user-not-found'){
        console.log('user not found');
        noError = false;
      }
      else if(errorCode === 'auth/wrong-password'){
        console.log('wrong password');
        noError = false;
      }
    })
    .then((user) => {
      console.log(user);
      if(noError){
        if(user.emailVerified) {
          console.log("logged in");
          this.navCtrl.setRoot('TabsPage');
          this.navCtrl.popToRoot();
          // Redirect the user here 
        }
        else {
          console.log('check email');
          this.sendEmailVerification();
          // Tell the user to have a look at his/her email
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openRegister() {
    this.navCtrl.push('RegisterPage');
  }
}
