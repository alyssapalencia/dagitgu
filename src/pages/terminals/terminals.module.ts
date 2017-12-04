import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TerminalsPage } from './terminals';

@NgModule({
  declarations: [
    TerminalsPage,
  ],
  imports: [
    IonicPageModule.forChild(TerminalsPage),
  ],
})
export class TerminalsPageModule {}
