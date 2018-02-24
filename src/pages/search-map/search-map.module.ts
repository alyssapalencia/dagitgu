import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMapPage } from './search-map';

@NgModule({
  declarations: [
    SearchMapPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMapPage),
  ],
})
export class SearchMapPageModule {}
