import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NotifCatPage } from '../pages/notif-cat/notif-cat';
import {NotifCatlistPage} from '../pages/notif-catlist/notif-catlist';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    NotifCatPage,
    NotifCatlistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
    //AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotifCatPage,
    NotifCatlistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
