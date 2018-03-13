import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, AlertController, PopoverController, NavParams, Popover } from 'ionic-angular';
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
  
  toggle: any = false;
  notif: any;
  marker: any;
  place: any;
  distance: any = 0;

  // DISTANCE
  originAddress: any;
  originLat: any;
  originLng: any;
  destinationAddress: any;
  destinationLat: any;
  destinationLng: any;

  // FETCH TRAFFIC COORDS
  dbtLatitude: any[] = [];
  dbtLongitude: any[] = [];
  tInfo: any[] = [];
  dbtTimeUpdated: any[] = [];

  // FETCH PARKING COORDS
  dbpLatitude: any[] = [];
  dbpLongitude: any[] = [];
  pInfo: any[] = [];

  now = Date.now();

  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public alertCtrl: AlertController, public popoverCtrl: PopoverController, public navParams: NavParams, private geolocation: Geolocation, public badge: Badge, private ngZone: NgZone) {
    this.marker = this.firebaseService.getUpdate();
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

    // AUTOCOMPLETE FOR ORIGIN
    const autocomstart = new google.maps.places.Autocomplete(this.autocomStart.nativeElement, options);
      autocomstart.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = google.maps.places.PlaceResult = autocomstart.getPlace();

          if(place.geometry == undefined || place.geometry == null) {
            this.place = place;
            return;
          }

          this.originAddress = place.formatted_address;
          this.originLat = place.geometry.location.lat();
          this.originLng = place.geometry.location.lng();
        });
      });

    // AUTOCOMPLETE FOR DESTINATION
    const autocomend = new google.maps.places.Autocomplete(this.autocomEnd.nativeElement, options);
      autocomend.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = google.maps.places.PlaceResult = autocomend.getPlace();

          if(place.geometry == undefined || place.geometry == null) {
            this.place = place;
            return;
          }

          this.destinationAddress = place.formatted_address;
          this.destinationLat = place.geometry.location.lat();
          this.destinationLng = place.geometry.location.lng();
        });
      });
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
      zoom: 6
    });
    directionsDisplay.setMap(map);

    directionsService.route({
      origin: { lat: this.originLat, lng: this.originLng },
      destination: { lat: this.destinationLat, lng: this.destinationLng },
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

    const _eQuatorialEarthRadius = 6378.1370;
    const _d2r = (Math.PI / 180.0);

    const dlong = (this.destinationLng - this.originLng) * _d2r;
    const dlat = (this.destinationLat - this.originLat) * _d2r;
    const a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(this.originLat * _d2r) * Math.cos(this.destinationLat * _d2r) * Math.pow(Math.sin(dlong / 2.0), 2.0);
    const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    const d = _eQuatorialEarthRadius * c;
    this.distance = d;
    
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
      
      var eventLocation: any[] = [], eventpLocation: any[] = [], tIconLink, pIconLink
      this.marker.subscribe(snapshot => {
        var i = 0;
        for(i = 0; i < snapshot.length; i++) {
          this.dbtLatitude[i] = snapshot[i].tlatitude;
          this.dbtLongitude[i] = snapshot[i].tlongitude;
          this.tInfo[i] = snapshot[i];
          this.dbtTimeUpdated[i] = snapshot[i].timeUpdated;

          this.dbpLatitude[i] = snapshot[i].platitude + 0.0002;
          this.dbpLongitude[i] = snapshot[i].plongitude + 0.0002;
          this.pInfo[i] = snapshot[i];

          if(this.tInfo[i].trafficRating == 'Light Traffic')
            tIconLink = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
          else if(this.tInfo[i].trafficRating == 'Moderate Traffic')
            tIconLink = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
          else if(this.tInfo[i].trafficRating == 'Heavy Traffic')
            tIconLink = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

          if(this.pInfo[i].parkingAvailability == 'Available Parking')
            pIconLink = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
          else if(this.pInfo[i].parkingAvailability == 'No Available Parking')
            pIconLink = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';

          eventLocation[i] = new google.maps.LatLng(this.dbtLatitude[i], this.dbtLongitude[i]);
          eventpLocation[i] = new google.maps.LatLng(this.dbpLatitude[i], this.dbpLongitude[i]);

          if((this.now - this.dbtTimeUpdated[i]) < 5400000) {
            this.addMarker(eventLocation[i], this.tInfo[i], this.dbtLatitude[i], tIconLink);
          }
          if(this.pInfo[i].parkingAvailability == 'Available Parking')
          {
            this.addpMarker(eventpLocation[i], this.pInfo[i], this.dbpLatitude[i], pIconLink);
          }
          
        }
      });
    });
  }

  addMarker(eventLocation, info, lat, iconLink) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: eventLocation,
      icon: iconLink
    });

    let content = info;       
    
    this.addInfoWindow(marker, content, lat, info);
  }

  addpMarker(eventLocation, info, lat, iconLink) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: eventLocation,
      icon: iconLink
    });

    let content = info;
    
    this.addpInfoWindow(marker, content, lat, info);
  }

  addInfoWindow(marker, content, lat, info){
    var contentString = '<h6>' + info.trafficRating + '</h6><b>Last Updated:</b> ' + info.trafficTimeStamp;
    var event: any[] = [];
    var y = 0;

    let infoWindow = new google.maps.InfoWindow({
      content: '<div class="infoBox">'+contentString+'</div>'
    });

     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
   });
  }

  addpInfoWindow(marker, content, lat, info){
    var contentString = '<h6>' + info.parkingAvailability + '</h6><b>Last Updated:</b> ' + info.parkingTimeStamp;
    var event: any[] = [];
    var y = 0;

    let infoWindow = new google.maps.InfoWindow({
      content: '<div class="infoBox">'+contentString+'</div>'
    });

     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
   });
  }
}
