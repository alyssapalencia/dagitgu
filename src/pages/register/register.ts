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
  lname: any;
  pass: any;
  conPass: any;

  dbEmail: any[] = [];
  dbUser: any[] = [];

  wrongPass = true;
  dupEmail = true;
  dupUser = true;

  constructor(public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.userInfo = this.firebaseService.getUserDetail();
    var i = 0;
    this.userInfo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.dbEmail[i] = snapshot.val().emailAddress;
        this.dbUser[i] = snapshot.val().username;
        i++;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  sendEmailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
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
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .catch((err)=> {
      var errorCode = err.code;

      if(errorCode === 'auth/email-already-in-use'){
        console.log(errorCode);
        noError = false;
        let alert = this.alertCtrl.create({
          title: 'Email Already In Use',
          subTitle: 'The email you entered is already used by someone else. Please enter another email and try again.',
          buttons: ['OK']
        });
        alert.present();
      }
      else if(errorCode === 'auth/invalid-email'){
        console.log(errorCode);
        noError = false;
        let alert = this.alertCtrl.create({
          title: 'Invalid Email',
          subTitle: 'The email you entered is invalid. Please enter a valid email address and try again.',
          buttons: ['OK']
        });
        alert.present();
      }
      else if(errorCode === 'auth/weak-password'){
        console.log(errorCode);
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
        this.sendEmailVerification();
        console.log(res);
      }  
    });
  }

  check(){
    for(var i=0; i<this.dbEmail.length; i++){
      if(this.email != this.dbEmail[i]){
        this.dupEmail = false;
      }
      else{
        this.dupEmail = true;
        break;
      }
    }

    for(var j=0; j<this.dbUser.length; j++){
      if(this.user != this.dbUser[j]){
        this.dupUser = false;
      }
      else{
        this.dupUser = true;
        break;
      }
    }

    if(this.pass == this.conPass){
      this.wrongPass = false;
    }

    if(this.checkInput()){
      if(this.checkEmail()){
        if(!this.dupEmail){
          if(!this.dupUser){
            if(!this.wrongPass){
              this.addUser();
            }
            else{
            console.log("wrong password");
            let alert = this.alertCtrl.create({
              title: 'Incorrect Password',
              subTitle: 'The passwords you entered do not match. Please retype your password and try again.',
              buttons: ['OK']
            });
            alert.present();
            }
          }
          else{
            console.log("username already exists");
            let alert = this.alertCtrl.create({
              title: 'Username Taken',
              subTitle: 'The username you entered already exists. Please enter another username and try again.',
              buttons: ['OK']
            });
            alert.present();
          }
        }
        else{
          console.log("email already used");
          let alert = this.alertCtrl.create({
            title: 'Email Already In Use',
            subTitle: 'The email you entered belongs to an existing account. Please enter another email address and try again.',
            buttons: ['OK']
          });
          alert.present();
        }
      }
      else{
        console.log("email invalid");
        let alert = this.alertCtrl.create({
          title: 'Invalid Email',
          subTitle: 'The email you entered is invalid. Please enter a valid email address and try again.',
          buttons: ['OK']
        });
        alert.present();
      }
    }
    else{
      console.log("one or more field/s lacks input")
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

  addUser(){
    this.userInfo = {
      "emailAddress": this.email,
      "username": this.user,
      "fName": this.name,
      "lName": this.lname,
      "password": this.pass
    }
    this.firebaseService.addUser(this.userInfo);
    this.navCtrl.push('LoginPage');

    let alert = this.alertCtrl.create({
      title: 'Account Created',
      subTitle: 'Your account was successfully created. Login to begin.',
      buttons: ['OK']
    });
    alert.present();
  }

  checkInput(){
    var input = false;

    if(!this.isBlank(this.email)){
      if(!this.isBlank(this.user)){
        if(!this.isBlank(this.name)){
          if(!this.isBlank(this.lname)){
            if(!this.isBlank(this.pass)){
              if(!this.isBlank(this.conPass)){
                input = true;
              }
            }
          }
        }
      }
    }
    return input;
  }

  checkEmail(){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))  
  {  
    return (true)  
  }  
    return (false)  
  }

  isBlank(str){
    if(!str || 0 === str.length){
      return true;
    }
  }
}
