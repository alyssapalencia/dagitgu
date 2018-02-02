import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
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

  constructor(public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {
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

  sendemailVerification() {
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
        let alert = this.alertCtrl.create({
          title: 'Invalid Email',
          subTitle: 'The email you entered is invalid. Please enter a valid email address and try again.',
          buttons: ['OK']
        });
        alert.present();
      }
      else if(errorCode === 'auth/user-not-found'){
        console.log('user not found');
        noError = false;
        let alert = this.alertCtrl.create({
          title: 'User Not Found',
          subTitle: 'The user does not exist. Please retype your email and try again.',
          buttons: ['OK']
        });
        alert.present();
      }
      else if(errorCode === 'auth/wrong-password'){
        console.log('wrong password');
        noError = false;
        let alert = this.alertCtrl.create({
          title: 'Wrong Password',
          subTitle: 'The password you entered is incorrect. Please retype your password and try again.',
          buttons: ['OK']
        });
        alert.present();
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
          this.sendemailVerification();
          // Tell the user to have a look at his/her email
          let alert = this.alertCtrl.create({
            title: 'Check Email',
            subTitle: 'A verification link was sent to your email. Check your email and follow the link to finish creating your DAGIT account.',
            buttons: ['OK']
          });
          alert.present();
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

  forgotPass(){
    this.navCtrl.push('ForgotPasswordPage');
  }
}
