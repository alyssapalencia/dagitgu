import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { App } from 'ionic-angular/components/app/app';
import { MorePage } from '../more/more';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';

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
  userDb: any;
  users: any[] = [];
  currUserDb: any;

  constructor(public firebaseService: ProviderDagitProvider, public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController, public app: App) {
    this.currUser = this.angularFireAuth.auth.currentUser;
    this.userDb = this.firebaseService.getUserDetail();

    this.userDb.subscribe(snapshot => {
			var i = 0;
		  snapshot.forEach(snap => {
			 	this.users[i] = snap;
				i++;
		 	})
	 	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  changePass(){
    for(var j =0; j < this.users.length; j++){
      if(this.currUser.email == this.users[j].emailAddress){
        this.currUserDb = this.users[j];
      }
    }
    if(this.checkInput()){
      if(this.oldPass != this.currUserDb.password){
        let alert = this.alertCtrl.create({
          title: 'Incorrect Password',
          subTitle: 'Your password was incorrect.',
          buttons: ['OK']
        });
        alert.present();
      }
      else if(this.newPass != this.conPass){
        let alert = this.alertCtrl.create({
          title: 'Passwords Do Not Match',
          subTitle: 'You must enter the same password twice in order to confirm it.',
          buttons: ['OK']
        });
        alert.present();
      }
      else if(this.newPass == this.currUserDb.password){
        let alert = this.alertCtrl.create({
          title: 'Password Already Used',
          subTitle: 'New password must differ from old password.',
          buttons: ['OK']
        });
        alert.present();
      }
      else{
        this.currUser.updatePassword(this.newPass)
        .catch((err) => {
          console.log(err.code);
        })
        .then(() => {
          this.currUser.password = this.newPass;
          this.firebaseService.editPassword(this.currUserDb.$key, this.newPass);
          let alert = this.alertCtrl.create({
            title: 'Password Changed',
            subTitle: 'Password successfully changed.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot('MorePage');
          this.navCtrl.popToRoot();
        })
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

  checkInput(){
    var input = false;

    if(!this.isBlank(this.oldPass)){
      if(!this.isBlank(this.newPass)){
        if(!this.isBlank(this.conPass)){
          input = true;
        }
      } 
    }
    return input;
  }

  isBlank(str){
    if(!str || 0 === str.length){
      return true;
    }
  }
}