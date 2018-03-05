import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-search-map',
  templateUrl: 'search-map.html',
})
export class SearchMapPage {
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

  constructor(public angularFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  
  }

  ionViewDidLoad() {
    var options = {
      componentRestrictions: {country: "phl"}
    }
    this.autocomplete = new google.maps.places.Autocomplete(this.autocomElement.nativeElement, options);
    this.autocomstart = new google.maps.places.Autocomplete(this.autocomStart.nativeElement, options);
    this.autocomend = new google.maps.places.Autocomplete(this.autocomEnd.nativeElement, options);
  }
  
  searchLocation() {
    var place = this.autocomplete.getPlace();
    this.lat = place.geometry.location.lat();
    this.lng = place.geometry.location.lng();
    this.loadMap();
  }

  calculateAndDisplayRoute() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: {lat: 9.3068, lng: 123.3054}
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
        google.maps.LatLng(9.3068, 123.3054);
      } else {
        LatLng = new
        google.maps.LatLng(this.lat, this.lng);
      }
    
      let mapOptions = {
        center: LatLng,
        zoom: 15
        //mapTypeId: google.maps.MayTypeId.ROADMAP
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
