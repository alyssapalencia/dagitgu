import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AlertController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  userInfo: any;
  email: any;
  user: any;
  fname: any;
  lname: any;
  pass: any;
  conPass: any;

  dbEmail: any[] = [];
  dbUser: any[] = [];

  wrongPass = true;
  dupEmail = true;
  dupUser = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
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
          let toast = this.toastCtrl.create({
            message: 'The passwords you have entered do not match! Try again.',
            showCloseButton: true,
            closeButtonText: 'OK',
            duration: 2000
          });
          toast.present();
        }
      }
      else{
        console.log("username already exists");
        let toast = this.toastCtrl.create({
          message: 'Username is already taken! Try again.',
          showCloseButton: true,
          closeButtonText: 'OK',
          duration: 2000
        });
        toast.present();
      }
    }
    else{
      console.log("email already used");
      let toast = this.toastCtrl.create({
        message: 'Email is already taken! Try again.',
        showCloseButton: true,
        closeButtonText: 'OK',
        duration: 2000
      });
      toast.present();
        }
      }
    }
    else{
      console.log("one or more field/s lacks input")
      let toast = this.toastCtrl.create({
        message: 'Fill up all fields and try again.',
        showCloseButton: true,
        closeButtonText: 'OK',
        duration: 2000
      });
      toast.present();
    }
  }

  openLogin() {
    this.navCtrl.push('LoginPage');
  }

  addUser(){
    this.userInfo = {
      "emailAddress": this.email,
      "username": this.user,
      "fName": this.fname,
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
    }
    return input;
  }

  checkEmail(){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))  
  {  
    return (true)  
  }  
    console.log("You have entered an invalid email address!");
    let toast = this.toastCtrl.create({
      message: 'You have entered an invalid email address! Try again.',
      showCloseButton: true,
      closeButtonText: 'OK',
      duration: 2000
    });
    toast.present();  
    return (false)  
  }

  isBlank(str){
    if(!str || 0 === str.length){
      return true;
    }
  }
}
