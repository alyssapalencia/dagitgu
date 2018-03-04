import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import { Badge } from '@ionic-native/badge';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any;
  userDb: any;
  users: any[] = [];
  currUserDb: any;

  constructor(public badge: Badge, public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public firebaseService: ProviderDagitProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.userDb = this.firebaseService.getUserDetail();

    this.userDb.subscribe(snapshot => {
			var i = 0;
		  snapshot.forEach(snap => {
			 	this.users[i] = snap;
				i++;
		 	})
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
    

    if(this.checkInput(username, password)){
      this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
      .catch((error) => {
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
            this.user = this.angularFireAuth.auth.currentUser;
            for(var j =0; j < this.users.length; j++){
              if(this.user.email == this.users[j].emailAddress){
                this.currUserDb = this.users[j];
              }
            }
            this.user.password = password;
            if(this.currUserDb.password != this.user.password){
              this.firebaseService.editPassword(this.currUserDb.$key, this.user.password);
            }
            this.requestPermission();
            this.getBadges();
            
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
    else{
      console.log("one or more field/s lacks input")
      /*let alert = this.alertCtrl.create({
        title: 'Missing Information',
        subTitle: 'Please fill up the form and try again.',
        buttons: ['OK']
      });
      alert.present();*/
    }
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
  
  checkInput(username, password){
    var input = false;

    if(!this.isBlank(username)){
      if(!this.isBlank(password)){
        input = true;
      } 
    }
    return input;
  }

  isBlank(str){
    if(!str || 0 === str.length){
      return true;
    }
  }
  
  async getBadges(){
    try{
      let badgeAmount = await this.badge.get();
    }
    catch (e){
      console.error(e);
    }
  }

  async setBadges(){
    try{
      let badge = await this.badge.set(Number(0));
    }
    catch (e){
      console.error(e);
    }
  }

  async requestPermission(){
    try{
      let hasPermission = await this.badge.hasPermission();
      console.log(hasPermission);
      if(!hasPermission){
        let permission = await this.badge.registerPermission();
        console.log(permission);
      }
    }
    catch (e){
      console.error(e);
    }
  }
}
