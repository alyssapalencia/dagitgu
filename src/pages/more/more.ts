import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  more: string = "profile"; //sets profile as default segment

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private app: App, public toastCtrl: ToastController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
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
