import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public alertCtrl: AlertController) {
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
      }
    }

    for(var j=0; j<this.dbUser.length; j++){
      if(this.user != this.dbUser[j]){
        this.dupUser = false;
      }
      else{
        this.dupUser = true;
      }
    }

    if(this.pass == this.conPass){
      this.wrongPass = false;
    }

    if(!this.dupEmail){
      if(!this.dupUser){
        if(!this.wrongPass){
          this.addUser();
        }
        else{
          console.log("wrong password");
        }
      }
      else{
        console.log("username already exists");
      }
    }
    else{
      console.log("email already used");
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
}
