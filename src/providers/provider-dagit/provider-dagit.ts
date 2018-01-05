import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'firebase/storage';

@Injectable()
export class ProviderDagitProvider {
  user: any;

  constructor(public http: Http, public dagit: AngularFireDatabase, public firebaseApp: FirebaseApp) {
    console.log('Hello ProviderDagitProvider Provider');
    this.user = "Justin Malana";
  }

  addUser(userInfo){
    this.dagit.list('/ACCOUNTS/GENERAL').push(userInfo);
  }

  addMessage(message){
    this.dagit.list('/chat/' + this.user).push(message);
  }

  getUserDetail(){
    return this.dagit.list('/ACCOUNTS/GENERAL');
  }

  getMessage(){
      return this.dagit.list('/chat/' + this.user);
  }

  getUser(){
    return this.user;
  }

  getTNotif(){
    return this.dagit.list('/notification');
  }

}
