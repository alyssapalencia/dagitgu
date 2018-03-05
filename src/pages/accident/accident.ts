import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';

declare var google;

@IonicPage()
@Component({
  selector: 'page-accident',
  templateUrl: 'accident.html',
})
export class AccidentPage {
  @ViewChild('autocomplete') autocompleteElement: ElementRef;
  autocomplete;
  element: any;

  today = new Date();
  accidentInfo: any;
  aLocation: any;
  accidentDescription: any;
  user: any;
  loading: any;
  selectedPhoto: any;
  photo: any;
  dlURL: any;

  onSuccess = (snapshot) => {
    this.photo = snapshot.downloadURL;
    this.loading.dismiss();
	}
	
	onError = (error) => {
		console.log('error', error);
		this.loading.dismiss();
	}
  
  constructor(public loadingCtrl: LoadingController, public camera: Camera, public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.user = this.angularFireAuth.auth.currentUser;
    this.aLocation = '';
    console.log(this.aLocation);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccidentPage');
    console.log(moment().format('MM/DD/YYYY hh:mm:ss A').toString()); //to check moment.js

    var options = {
      componentRestrictions: {country: "phl"}
    }

    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteElement.nativeElement, options);
  }

  addAccidentReport() {
    this.aLocation = document.getElementById('autocomplete')["value"];
    console.log(this.aLocation);

    this.accidentInfo = {
      "image": this.photo,
      "reportSender": this.user.displayName,
      "location": this.aLocation,
      "accidentDescription": this.accidentDescription,
      "timeStamp": moment().format('MM/DD/YYYY hh:mm:ss A').toString(),
      "status": "unread",
      "sort": 0 - Date.now()
    }
    this.firebaseService.addAccidentReport(this.accidentInfo);
    let alert = this.alertCtrl.create({
      title: 'Report Sent',
      subTitle: 'Your report was sent to our Helpdesk. Thank you for your contribution.',
      buttons: ['OK']
    });
    alert.present();
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openGallery(){
    console.log('gallery');
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: 0
		}
		  
		  this.uploadPhoto(options);
  }

  uploadPhoto(options){
		this.camera.getPicture(options).then((imageData) => {
			this.loading = this.loadingCtrl.create({
				content: 'Please wait...'
			});
			this.loading.present();

			this.selectedPhoto = this.dateURItoBlob('data:image/jpeg;base64,' + imageData);

			this.upload();
		}, (err) => {
		});
	}

	dateURItoBlob(dataURI){
		let binary = atob(dataURI.split(',')[1]);
		let array = [];
		for (let i = 0; i < binary.length; i++) {
		  array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }
  
  upload() {
		var key = this.firebaseService.addImageName();

		if (this.selectedPhoto) {
		  this.dlURL = this.firebaseService.uploadPhoto(this.selectedPhoto, key);
		  this.dlURL.then(this.onSuccess, this.onError);  
		}
  }
}

