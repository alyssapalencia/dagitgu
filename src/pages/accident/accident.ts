import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';
import { } from 'googlemaps';

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
  place: any;

  onSuccess = (snapshot) => {
    this.photo = snapshot.downloadURL;
    this.loading.dismiss();
	} 
	
	onError = (error) => {
		console.log('error', error);
		this.loading.dismiss();
	}
  
  constructor(public loadingCtrl: LoadingController, public camera: Camera, public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController, private ngZone: NgZone) {
    this.user = this.angularFireAuth.auth.currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccidentPage');

    var options = {
      componentRestrictions: {country: "phl"}
    }

    const autocomplete = new google.maps.places.Autocomplete(this.autocompleteElement.nativeElement, options);
      autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = google.maps.places.PlaceResult = autocomplete.getPlace();

        if(place.geometry == undefined || place.geometry == null) {
          this.place = place;
          return;
        }
        this.aLocation = place.formatted_address;
      });
    });
  }

  addAccidentReport() {
    if(!this.isBlank(this.user.displayName) && !this.isBlank(this.aLocation) && !this.isBlank(this.accidentDescription)){
      if(!this.isBlank(this.photo)){
        this.accidentInfo = {
        "image": this.photo,
        "reportSender": this.user.displayName,
        "location": this.aLocation,
        "accidentDescription": this.accidentDescription,
        "timeStamp": moment().format('MMMM Do YYYY, hh:mm A').toString(),
        "status": "unread",
        "sort": 0 - Date.now()
        }
        this.firebaseService.addAccidentReport(this.accidentInfo);
        const date = moment().format('MMMM D YYYY');
        this.firebaseService.addAccidentLog(date, this.accidentInfo);
        
        let alert = this.alertCtrl.create({
          title: 'Report Sent',
          subTitle: 'Your report was sent to our Helpdesk. Thank you for your contribution.',
          buttons: ['OK']
        });
        alert.present();
        this.viewCtrl.dismiss();
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Missing Image',
          subTitle: 'Please upload a photo.',
          buttons: ['OK']
        });
        alert.present();
      }
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Missing Information',
        subTitle: 'Please fill up the form and try again.',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  isBlank(str){
    if(!str || 0 === str.length){
      return true;
    }else if(str.trim().length == 0){
      return true;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openGallery(){
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