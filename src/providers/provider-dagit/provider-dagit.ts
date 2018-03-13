import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Badge } from '@ionic-native/badge';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import 'firebase/storage';

@Injectable()
export class ProviderDagitProvider {
  user: any;

  constructor(public http: Http, public dagit: AngularFireDatabase, public firebaseApp: FirebaseApp, public angularFireAuth: AngularFireAuth, public badge: Badge) {
    this.user = name;
  }

  addUser(userInfo){
    this.dagit.list('/ACCOUNTS/GENERAL').push(userInfo);
  }

  setUser(name){
    this.user = this.angularFireAuth.auth.currentUser;
  }

  addMessage(message, user){
    this.dagit.list('/CHAT/' + user).push(message);
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

  getMessage(user){
      return this.dagit.list('/CHAT/' + user);
  }

  getUser(){
    return this.user;
  }

  getUpdate() {
    return this.dagit.list('/MAPS/');
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

  getInformation() {
    return this.dagit.list('/INFORMATION');
  }

  // CONTACT
  updateStatus(user) {
    this.dagit.object('/CHAT/' + user.displayName + '/status').set("unread");
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
