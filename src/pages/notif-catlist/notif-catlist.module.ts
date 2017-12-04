import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotifCatlistPage } from './notif-catlist';

@NgModule({
  declarations: [
    NotifCatlistPage,
  ],
  imports: [
    IonicPageModule.forChild(NotifCatlistPage),
  ],
})
export class NotifCatlistPageModule {}
