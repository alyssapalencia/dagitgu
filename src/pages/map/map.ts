import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
import { Badge } from '@ionic-native/badge';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('autocomplete') autocomElement: ElementRef;
  @ViewChild('autocomstart') autocomStart: ElementRef;
  @ViewChild('autocomend') autocomEnd: ElementRef;
  autocomplete;
  autocomstart;
  autocomend;
  element: any;

  Start: any;
  End: any;

  map: any;
  currentLocation: any;
  lat: any;
  lng: any;

  toggle: any = false;

  constructor(public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public popoverCtrl: PopoverController, public badge: Badge) {
  }

  changeToggle() {
    if(!this.toggle) {
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }

  ionViewDidLoad() {
    var options = {
      componentRestrictions: {country: "phl"}
    }
    this.autocomplete = new google.maps.places.Autocomplete(this.autocomElement.nativeElement, options);
    this.autocomstart = new google.maps.places.Autocomplete(this.autocomStart.nativeElement, options);
    this.autocomend = new google.maps.places.Autocomplete(this.autocomEnd.nativeElement, options);
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create('SearchMapPage');
    popover.present();
  }
  
  searchLocation() {
    var place = this.autocomplete.getPlace();
    this.lat = place.geometry.location.lat();
    this.lng = place.geometry.location.lng();
    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());
    this.loadMap();
  }

  calculateAndDisplayRoute() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6
    });
    directionsDisplay.setMap(map);

    directionsService.route({
      origin: this.Start,
      destination: this.End,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  ionViewWillEnter() {
    this.loadMap();
  }
  
  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
    var LatLng;

      if(this.lat == null) {
        LatLng = new
        google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      } else {
        LatLng = new
        google.maps.LatLng(this.lat, this.lng);
      }
    
      let mapOptions = {
        center: LatLng,
        zoom: 15
      }

      this.map = new
      google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.currentLocation = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: LatLng
      });
    })
  } 
}
