import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';

declare var google;

@IonicPage()
@Component({
  selector: 'page-violation',
  templateUrl: 'violation.html',
})
export class ViolationPage {
  @ViewChild('autocomplete') autocompleteElement: ElementRef;
  autocomplete;
  element: any;
<<<<<<< HEAD

  disabled = true;

=======
>>>>>>> a53c632f49d2047f54412e9264a7d39f0fbef27e
  today = new Date();
  violationInfo: any;
  vLocation: any;
  reportContent: any;
  otherDescription = "";
  vehicleType: any;
  plateNumber: any;
  color: any;
  model = "";
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

  constructor(public camera: Camera, public loadingCtrl: LoadingController, public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController, private ngZone: NgZone) {
    this.user = this.angularFireAuth.auth.currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViolationPage');

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
          this.vLocation = place.formatted_address;
        });
    });
  }

  addViolationReport() {
    if(!this.isBlank(this.user.displayName) && !this.isBlank(this.vLocation)
      && !this.isBlank(this.reportContent) && !this.isBlank(this.vehicleType) && !this.isBlank(this.plateNumber)
      && !this.isBlank(this.color)){
        if(!this.isBlank(this.photo)){
          if(this.reportContent == 'Other'){
            this.reportContent = this.otherDescription;
          }
          this.violationInfo = {
          "image": this.photo,
          "reportSender": this.user.displayName,
          "location": this.vLocation,
          "reportContent": this.reportContent,
          "vehicleType": this.vehicleType,
          "plateNumber": this.plateNumber,
          "color": this.color,
          "model": this.model,
          "timeStamp": moment().format('MMMM Do YYYY, hh:mm A').toString(),
          "status": "unread",
          "sort": 0 - Date.now()
          }
          this.firebaseService.addViolationReport(this.violationInfo);
          const date = moment().format('MMMM D YYYY');
          this.firebaseService.addViolationLog(date, this.violationInfo);
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

  enableOther(){
    if(this.reportContent == "Other"){
      this.disabled = false;
    }
    else{
      this.disabled = true;
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