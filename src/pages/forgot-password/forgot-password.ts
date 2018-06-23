import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  constructor(public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  sendEmail(email){
    var noError = true;
    this.angularFireAuth.auth.sendPasswordResetEmail(email)
    .catch((error) => {
      var errorCode = error.code;
      if(errorCode === 'auth/invalid-email'){
        noError = false;
        let alert = this.alertCtrl.create({
          title: 'Invalid Email',
          subTitle: 'The email you entered is invalid. Please enter a valid email address and try again.',
          buttons: ['OK']
        });
        alert.present();
      }
      else if(errorCode === 'auth/user-not-found'){
        noError = false;
        let alert = this.alertCtrl.create({
          title: 'User Not Found',
          subTitle: 'The user does not exist. Please retype your email and try again.',
          buttons: ['OK']
        });
        alert.present();
      }
    })
    .then(() => {
      if(noError){
        let alert = this.alertCtrl.create({
          title: 'Email sent!',
          subTitle: 'A reset password link has been sent to your email. Please check your email and click the link to reset your password.',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push('LoginPage');
      }
    })
  }
}