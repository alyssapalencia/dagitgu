import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(public angularFireAuth: AngularFireAuth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      const unsubscribe = angularFireAuth.auth.onAuthStateChanged( user => {
        console.log(user);
        if (!user) {
          this.rootPage = 'LoginPage';
          unsubscribe();
        } else { 
          if(user.emailVerified){
            this.rootPage = 'TabsPage';
            unsubscribe();
          }
          else{
            this.angularFireAuth.auth.signOut();
            this.rootPage = 'LoginPage';
            unsubscribe();
          }
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
