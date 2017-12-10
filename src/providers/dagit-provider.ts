import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';
//import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FireBaseService{
    constructor(public dagit: AngularFireDatabase, public firebaseApp: FirebaseApp){

    }
    
    addMessage(message){
        this.dagit.list('/chat/').push(message);
    }

    getMessage(){
        return this.dagit.list('/chat/');
    }
}