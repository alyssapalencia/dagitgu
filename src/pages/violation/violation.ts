import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-violation',
  templateUrl: 'violation.html',
})
export class ViolationPage {
  today = new Date();
  violationInfo: any;
  location: any;
  reportContent: any;
  vehicleType: any;
  plateNumber: any;
  color: any;
  model: any;
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

  constructor(public camera: Camera, public loadingCtrl: LoadingController, public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.user = this.angularFireAuth.auth.currentUser;
    console.log(moment().format('MM/DD/YYYY hh:mm:ss A').toString()); //to check moment.js
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViolationPage');
  }

  addViolationReport() {
    this.violationInfo = {
      "image": this.photo,
      "reportSender": this.user.displayName,
      "location": this.location,
      "reportContent": this.reportContent,
      "vehicleType": this.vehicleType,
      "plateNumber": this.plateNumber,
      "color": this.color,
      "model": this.model,
      "timeStamp": moment().format('MM/DD/YYYY hh:mm:ss A').toString()
    }
    this.firebaseService.addViolationReport(this.violationInfo);
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Report Sent',
      subTitle: 'Your report was sent to our Helpdesk. Thank you for your contribution.',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push('HelpdeskPage');
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
