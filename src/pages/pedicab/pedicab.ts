import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-pedicab',
  templateUrl: 'pedicab.html',
})
export class PedicabPage {
  /*today = new Date();
  pedicabInfo: any;
  pedicabNumber: any;
  violationType: any;
  user: any;*/

  lname: any;
  category: any;
  usersDeskDb: any;
  usersOfDb: any;
  usersDesk: any[] = [];
  usersOf: any[] = [];
  result: any[] = [];
  found = false;
  

  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    //this.user = this.angularFireAuth.auth.currentUser;
    this.usersDeskDb = this.firebaseService.getDeskTMO();
    this.usersOfDb = this.firebaseService.getOfTMO();

    this.usersDeskDb.subscribe(snapshot => {
			var i = 0;
		 snapshot.forEach(snap => {
			 	this.usersDesk[i] = snap;
				i++;
		 	})
     });
     
     this.usersOfDb.subscribe(snapshot => {
			var j = 0;
		 snapshot.forEach(snap => {
			 	this.usersOf[j] = snap;
				j++;
		 	})
	 	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedicabPage');
    console.log(moment().format('MM/DD/YYYY hh:mm:ss A').toString()); //to check moment.js
  }

  /*addPedicabReport() {
    this.pedicabInfo = {
      "reportSender": this.user.displayName,
      "pedicabNumber": this.pedicabNumber,
      "violationType": this.violationType,
      "timeStamp": moment().format('MM/DD/YYYY hh:mm:ss A').toString()
    }
    this.firebaseService.addPedicabReport(this.pedicabInfo);
    let alert = this.alertCtrl.create({
      title: 'Report Sent',
      subTitle: 'Your report was sent to our Helpdesk. Thank you for your contribution.',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push('HelpdeskPage');
  }*/

  search(){
    this.result.length = 0;
    this.found = false;
    if(this.category == 'desk'){
      this.searchDesk();
    }
    else{
      this.searchOf();
    }

    this.show();
  }

  searchDesk(){
    for(let i = 0; i < this.usersDesk.length; i++){
      if(this.usersDesk[i].lName.search(this.lname) != -1){
        this.result[this.result.length] = this.usersDesk[i];
        this.found = true;
      }
    }
  }

  searchOf(){
    for(let i = 0; i < this.usersOf.length; i++){
      if(this.usersOf[i].lName.search(this.lname) != -1){
        this.result[this.result.length] = this.usersOf[i];
        this.found = true;
      }
    }
  }

  show(){
    if(this.found){
      for(let i = 0; i < this.result.length; i++){
      console.log(this.result[i]);
      }
    }
    else{
      console.log("no user found");
    }
  }
}
