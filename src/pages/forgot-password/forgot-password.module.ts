import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPasswordPage } from './forgot-password';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    ForgotPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotPasswordPage),
  ],
  providers:[
    AngularFireAuth
  ]
})
export class ForgotPasswordPageModule {}
