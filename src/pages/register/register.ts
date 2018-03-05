import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  userInfo: any;
  email: any;
  user: any;
  name: any;
  fname: any;
  lname: any;
  pass: any;
  conPass: any;

  wrongPass = true;

  constructor(public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  sendemailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          let alert = this.alertCtrl.create({
            title: 'Email sent!',
            subTitle: 'A verification link has been sent to your email. Check your email and follow the link to finish creating your DAGIT account.',
            buttons: ['OK']
          });
          alert.present();
        })
    });
  }

  register(email, password) {
    var noError = true;
    this.pass = password;
    this.name = this.fname + ' ' + this.lname;
    if(this.checkInput()){
      if(!this.wrongPass){
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .catch((err)=> {
          var errorCode = err.code;

          if(errorCode === 'auth/email-already-in-use'){
            noError = false;
            let alert = this.alertCtrl.create({
              title: 'Email Already In Use',
              subTitle: 'The email you entered is already used by someone else. Please enter another email and try again.',
              buttons: ['OK']
            });
            alert.present();
          }
          else if(errorCode === 'auth/invalid-email'){
            noError = false;
            let alert = this.alertCtrl.create({
              title: 'Invalid Email',
              subTitle: 'The email you entered is invalid. Please enter a valid email address and try again.',
              buttons: ['OK']
            });
            alert.present();
          }
          else if(errorCode === 'auth/weak-password'){
            noError = false;
            let alert = this.alertCtrl.create({
              title: 'Weak Password',
              subTitle: 'The password you entered is weak. Please use a combination of letters and numbers and try again.',
              buttons: ['OK']
            });
            alert.present();
          }
        })
        .then((res) => {
          if(noError){
            res.updateProfile({
            displayName: this.name,
            photoURL: ''
            })
            this.sendemailVerification();
            this.adduser();
            this.openLogin();
          }
        });
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Passwords Do Not Match',
          subTitle: 'You must enter the same password twice in order to confirm it.',
          buttons: ['OK']
        });
        alert.present();
        }
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Missing Information',
        subTitle: 'Please fill up the form and try again.',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  openLogin() {
    this.navCtrl.push('LoginPage');
  }

  checkInput(){
    var input = false;

    if(!this.isBlank(this.email)){
      if(!this.isBlank(this.fname)){
        if(!this.isBlank(this.lname)){
          if(!this.isBlank(this.pass)){
            if(!this.isBlank(this.conPass)){
              input = true;
            }
          }
        }
      } 
    }

    if(this.pass == this.conPass){
      this.wrongPass = false;
    }

    return input;
  }

  isBlank(str){
    if(!str || 0 === str.length){
      return true;
    }
  }

  adduser(){
    this.userInfo = {
      "accountPicture": "",
      "emailAddress": this.email,
      "fName": this.fname,
      "lName": this.lname,
      "password": this.pass,
    }
    this.firebaseService.addUser(this.userInfo);
  }
}
