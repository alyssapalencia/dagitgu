import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { ChangePasswordPage } from '../change-password/change-password';
import { UpdateProfileImagePage } from '../update-profile-image/update-profile-image';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  more: string = "profile"; //sets profile as default segment
  info: any; //display information in faqs

  currUser: any;

  constructor(public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private app: App, public toastCtrl: ToastController) {
    this.currUser = angularFireAuth.auth.currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(this.angularFireAuth.auth.currentUser.email);
  }

  changePassword(){
    this.navCtrl.push(ChangePasswordPage);
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
            this.angularFireAuth.auth.signOut();
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

  openUpdateProfileImage() {
    this.navCtrl.push(UpdateProfileImagePage);
  }

  openChangePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }
}
