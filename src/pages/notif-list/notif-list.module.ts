import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotifListPage } from './notif-list';

@NgModule({
  declarations: [
    NotifListPage,
  ],
  imports: [
    IonicPageModule.forChild(NotifListPage),
  ],
})
export class NotifListPageModule {}
