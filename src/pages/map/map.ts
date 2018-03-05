import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
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
  distance: any = 0;

  // FETCH TRAFFIC COORDS
  dbtLatitude: any[] = [];
  dbtLongitude: any[] = [];
  tInfo: any[] = [];

  // FETCH PARKING COORDS
  dbpLatitude: any[] = [];
  dbpLongitude: any[] = [];
  pInfo: any[] = [];

  constructor(public angularFireAuth: AngularFireAuth, public firebaseService: ProviderDagitProvider, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private geolocation: Geolocation, public badge: Badge) {
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
    this.autocomstart = new google.maps.places.Autocomplete(this.autocomStart.nativeElement, options);
    this.autocomend = new google.maps.places.Autocomplete(this.autocomEnd.nativeElement, options);
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
      destination: this.End
      //travelMode: 'DRIVING'
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

  /*infoWindow(marker, content, Lat) {
    var contentString = '';
    var update: any[] = [];
    var y = 0;

    for(var i = 0; i < this.markerInfo.length; i++) {
      if(this.markerInfo[i].locLat = Lat) {
        contentString = contentString.concat('<div id="'+this.markerInfo[i].$key+'">'+this.markerInfo[i].notifDetail+'</div>');
        event[y] = this.markerInfo[i].$key;
        y++;
      }
    }

    let infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })
  }*/

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

      /*var updateLocation: any[] = [], iconLink;
      for(var j = 0; j < this.dbtLatitude.length; j++) {
        updateLocation[j] = new google.maps.LatLng(this.dbtLatitude[j], this.dbtLongitude[j]);

        if(this.cat[j].location.trafficRating == 'Light Traffic') {
          iconLink = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        } else if(this.cat[j].location.trafficRating == 'Moderate Traffic') {
          iconLink = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        } else if(this.cat[j].location.trafficRating == 'Heavy Traffic') {
          iconLink = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }

        //this.addMarker(updateLocation[j], this.tInfo[j], this.dbtLatitude[j], iconLink);
      }*/
      
      var eventLocation: any[] = [], eventpLocation: any[] = [], tIconLink, pIconLink
      this.marker.subscribe(snapshot => {
        console.log(snapshot);
        var i = 0;
        for(i = 0; i < snapshot.length; i++) {
          this.dbtLatitude[i] = snapshot[i].tlatitude;
          this.dbtLongitude[i] = snapshot[i].tlongitude;
          this.tInfo[i] = snapshot[i];

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
          this.addMarker(eventLocation[i], this.tInfo[i], this.dbtLatitude[i], tIconLink);
          this.addpMarker(eventpLocation[i], this.pInfo[i], this.dbpLatitude[i], pIconLink);
        }

        /*for(i = 0; i < snapshot.length; i++) {
          eventLocation[i] = new google.maps.LatLng(this.dbtLatitude[i], this.dbtLongitude[i]);
          this.addMarker(eventLocation[i], this.tInfo[i], this.dbtLatitude[i]);
        }*/
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
    console.log(info.length);
    
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
    console.log(info.length);
    
    this.addpInfoWindow(marker, content, lat, info);
  }

  addInfoWindow(marker, content, lat, info){

    console.log(info);
    //var contentString = '<div id="tap"><h3>'+content.name+'</h3><hr>'+content.date+'<br>'+content.time+'<hr>Attendees: '+content.tapok+'<br></div>';
    var contentString = info.trafficRating + '<br>' + info.$key;
    var event: any[] = [];
    var y = 0;
    console.log(content.length);
    /*for(var i=0;i<info.length;i++){
      /*if(info[i].latitude == lat){
        contentString = contentString.concat('<div id="'+info[i].$key+'"><h3 id="'+info[i].$key+'">'+info[i].name+'</h3><hr>'+info[i].date+'<br>'+info[i].time+'<hr>Attendees: '+info[i].tapok+'<br></div>');
        event[y] = info[i].$key;
        y++;
      }
      //contentString = 'test';
      contentString = contentString.concat('info[i].tFName');
    }*/

    let infoWindow = new google.maps.InfoWindow({
      content: '<div class="scrollFix">'+contentString+'</div>'
    });

     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
        /*google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          for(var i=0;i<event.length;i++){
            document.getElementById(event[i]).addEventListener('click', (ev) => {
              //this.openTapokContent(ev.toElement.id);
              console.log(ev.toElement.id);
            });
            console.log(event[i].length);
          }
        });*/
   });
  }

  addpInfoWindow(marker, content, lat, info){

    console.log(info);
    //var contentString = '<div id="tap"><h3>'+content.name+'</h3><hr>'+content.date+'<br>'+content.time+'<hr>Attendees: '+content.tapok+'<br></div>';
    var contentString = info.parkingAvailability + '<br>' + info.$key;
    var event: any[] = [];
    var y = 0;
    console.log(content.length);
    /*for(var i=0;i<info.length;i++){
      /*if(info[i].latitude == lat){
        contentString = contentString.concat('<div id="'+info[i].$key+'"><h3 id="'+info[i].$key+'">'+info[i].name+'</h3><hr>'+info[i].date+'<br>'+info[i].time+'<hr>Attendees: '+info[i].tapok+'<br></div>');
        event[y] = info[i].$key;
        y++;
      }
      //contentString = 'test';
      contentString = contentString.concat('info[i].tFName');
    }*/

    let infoWindow = new google.maps.InfoWindow({
      content: '<div class="scrollFix">'+contentString+'</div>'
    });

     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
        /*google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          for(var i=0;i<event.length;i++){
            document.getElementById(event[i]).addEventListener('click', (ev) => {
              //this.openTapokContent(ev.toElement.id);
              console.log(ev.toElement.id);
            });
            console.log(event[i].length);
          }
        });*/
   });
  }
}
