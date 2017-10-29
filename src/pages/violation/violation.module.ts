import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViolationPage } from './violation';

@NgModule({
  declarations: [
    ViolationPage,
  ],
  imports: [
    IonicPageModule.forChild(ViolationPage),
  ],
})
export class ViolationPageModule {}
