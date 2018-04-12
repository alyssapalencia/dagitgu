import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import { MorePage } from '../more/more';
import { App } from 'ionic-angular/components/app/app';

@IonicPage()
@Component({
  selector: 'page-update-profile-image',
  templateUrl: 'update-profile-image.html',
})
export class UpdateProfileImagePage {
  loading: any;
  selectedPhoto: any;
  photo: any;
  dlURL: any;
	user: any;
	userDb: any;
	users: any[] = [];
	userFound: any;

  onSuccess = (snapshot) => {
    this.photo = snapshot.downloadURL;
		this.bindPhoto();
    this.loading.dismiss();
		this.navCtrl.setRoot('MorePage');
		this.navCtrl.popToRoot();
	}
	
	onError = (error) => {
		console.log('error', error);
		this.loading.dismiss();
	}

  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public loadingCtrl: LoadingController, public camera: Camera, public navCtrl: NavController, public navParams: NavParams, public app: App) {
		this.user = this.angularFireAuth.auth.currentUser;
		this.userDb = this.firebaseService.getUserDetail();

		this.userDb.subscribe(snapshot => {
			var i = 0;
		 snapshot.forEach(snap => {
			 	this.users[i] = snap;
				i++;
		 	})
	 	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfileImagePage');
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
  
  bindPhoto(){
    this.user.updateProfile({
      displayName: this.user.displayName,
      photoURL: this.photo
		})

		for(var j = 0; j < this.users.length; j++){
			if(this.users[j].emailAddress == this.user.email){
				this.userFound = this.users[j]
			}
		}
		this.firebaseService.addDbImage(this.userFound.$key, this.photo);
	}
}