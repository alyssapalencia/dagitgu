import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotifCatPage } from './notif-cat';

@NgModule({
  declarations: [
    NotifCatPage,
  ],
  imports: [
    IonicPageModule.forChild(NotifCatPage),
  ],
})
export class NotifCatPageModule {}
