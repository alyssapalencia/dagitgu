import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedicabPage } from './pedicab';

@NgModule({
  declarations: [
    PedicabPage,
  ],
  imports: [
    IonicPageModule.forChild(PedicabPage),
  ],
})
export class PedicabPageModule {}
