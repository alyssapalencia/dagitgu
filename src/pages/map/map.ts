import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ProviderDagitProvider } from '../../providers/provider-dagit/provider-dagit';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { Badge } from '@ionic-native/badge';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

declare var google;

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

  Lat: any[] = [];
  Lng: any[] = [];
  cat: any[] = [];
  info: any[] = [];

  toggle: any = false;
  notif: any;

  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public popoverCtrl: PopoverController, public badge: Badge) {
    this.notif = this.firebaseService.getUpdate();

    this.notif.subscribe(snapshot => {
      this.Lat.length = 0;
      this.Lng.length = 0;
      var x = 0;
      
      snapshot.forEach(snap => {
        this.Lat[x] = snap.locLat;
        this.Lng[x] = snap.locLng;
        this.cat[x] = snap;
        this.info[x] = snap.notifDetail;
        console.log(this.Lat[x]);
        x++;
      });
    });
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
      var eventLocation: any[] = [], iconLink;
      console.log(this.cat.length);
      for(var i = 0; i < this.Lat.length; i++) {
        eventLocation[i] = new google.maps.LatLng(this.Lat[i], this.Lng[i]);
        if(this.cat[i].category == 'Traffic') {
          if(this.cat[i].subcategory == 'Light')
            iconLink = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
          else if(this.cat[i].subcategory == 'Moderate')
            iconLink = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
          else if(this.cat[i].subcategory == 'Heavy')
            iconLink = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }
        this.addMarker(eventLocation[i], this.Lat[i], iconLink);
        console.log("test");
      }
    });
  }
  
  addMarker(eventLocation, Lat, iconLink) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: eventLocation,
      icon: iconLink
    });
  }
}
