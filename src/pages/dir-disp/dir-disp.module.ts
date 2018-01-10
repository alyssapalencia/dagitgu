import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirDispPage } from './dir-disp';

@NgModule({
  declarations: [
    DirDispPage,
  ],
  imports: [
    IonicPageModule.forChild(DirDispPage),
  ],
})
export class DirDispPageModule {}
