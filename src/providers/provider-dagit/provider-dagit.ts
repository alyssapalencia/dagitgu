import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Badge } from '@ionic-native/badge';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'firebase/storage';

@Injectable()
export class ProviderDagitProvider {
  user: any;

  constructor(public http: Http, public dagit: AngularFireDatabase, public firebaseApp: FirebaseApp, public badge: Badge) {
    console.log('Hello ProviderDagitProvider Provider');
    this.user = "Test User";
  }

  addUser(userInfo){
    this.dagit.list('/ACCOUNTS/GENERAL').push(userInfo);
  }

  addMessage(message){
    this.dagit.list('/chat/' + this.user).push(message);
  }

  addAccidentReport(accident){
    this.dagit.list('/ACCIDENT').push(accident);
  }

  addViolationReport(violation){
    this.dagit.list('/VIOLATION').push(violation);
  }

  addPedicabReport(pedicab){
    this.dagit.list('/PEDICAB').push(pedicab);
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
    return this.dagit.list('/NOTIFICATIONS', {
      query:{
        orderByChild: 'sort'
      }
    });
  }

  getDirectory() {
    return this.dagit.list('/DIRECTORY');
  }

  uploadPhoto(image, key){
    var dlURL;
    var metadata = {
      contentType: 'image/jpeg'
    }
    const storageRef = this.firebaseApp.storage().ref().child('images/'+key+'.jpg').put(image);
    //storageRef.putString(image, 'base64', metadata);
    //dlURL = storageRef.child('some text').getDownloadURL;
    return storageRef;
  }

  addImageName(){
    var key;

    key = this.dagit.list('IMAGE_NAME').push(Date.now());
    return key;
  }

  addDbImage(key, imageName){
    this.dagit.object('/ACCOUNTS/GENERAL/' + key + '/accountPicture').set(imageName);
  }

  editPassword(key, newPass){
    this.dagit.object('/ACCOUNTS/GENERAL/' + key + '/password').set(newPass);
  }

  getDeskTMO(){
    return this.dagit.list('/ACCOUNTS/DESK_TMO/');
  }

  getOfTMO(){
    return this.dagit.list('/ACCOUNTS/ON_FIELD_TMO');
  }

}
