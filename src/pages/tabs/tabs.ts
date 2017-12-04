import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'MapPage';
  tab2Root = 'DirectoryPage';
  tab3Root = 'NotifListPage';
  tab4Root = 'HelpdeskPage';
  tab5Root = 'ProfilePage';

  constructor() {

  }
}
