import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private app: App, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  showLogout() {
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            console.log('Logout clicked');
            this.app.getRootNav().setRoot(LoginPage);
            let toast = this.toastCtrl.create({
              message: 'You have successfully logged out.',
              duration: 2000
            });
            toast.present();
            /* let nav = this.app.getRootNav();
            nav.push(LoginPage); */
          }
        }
      ]
    });
    confirm.present();
  }
}
