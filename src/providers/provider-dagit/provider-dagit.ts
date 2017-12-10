import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'firebase/storage';

/*
  Generated class for the ProviderDagitProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProviderDagitProvider {

  constructor(public http: Http, public dagit: AngularFireDatabase, public firebaseApp: FirebaseApp) {
    console.log('Hello ProviderDagitProvider Provider');
  }

  addMessage(message){
    this.dagit.list('/chat/').push(message);
  }

  getMessage(){
      return this.dagit.list('/chat/');
  }

}
