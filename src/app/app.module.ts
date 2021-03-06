import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NotifCatPage } from '../pages/notif-cat/notif-cat';
import { NotifCatlistPage} from '../pages/notif-catlist/notif-catlist';
import { LoginPageModule } from '../pages/login/login.module';

import { Badge } from '@ionic-native/badge';

import { firebaseConfig } from '../environment';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProviderDagitProvider } from '../providers/provider-dagit/provider-dagit';
import { DirDispPage } from '../pages/dir-disp/dir-disp';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { UpdateProfileImagePage } from '../pages/update-profile-image/update-profile-image';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

var config = {
  apiKey: "AIzaSyDPsMJ-x7W6_U_k3JsNwMNkxL38e8NkQDI",
  authDomain: "dagit-7cbac.firebaseapp.com",
  databaseURL: "https://dagit-7cbac.firebaseio.com",
  projectId: "dagit-7cbac",
  storageBucket: "dagit-7cbac.appspot.com",
  messagingSenderId: "902262473533"
};

@NgModule({
  declarations: [
    MyApp,
    NotifCatPage,
    NotifCatlistPage,
    DirDispPage,
    ChangePasswordPage,
    UpdateProfileImagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotifCatPage,
    NotifCatlistPage, 
    DirDispPage,
    ChangePasswordPage,
    UpdateProfileImagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProviderDagitProvider,
    AngularFireAuth,
    Camera,
    Geolocation,
    Badge
  ]
})
export class AppModule {}
