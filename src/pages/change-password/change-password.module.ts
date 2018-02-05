import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordPage } from './change-password';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePasswordPage),
  ],
  providers: [
    AngularFireAuth
  ]
})
export class ChangePasswordPageModule {}
