import { Component } from '@angular/core';
import { EventType, TravelData, TravelMarker, TravelMarkerOptions } from 'travel-marker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  zoom: number = 15;
  isFirst = true;

  origin = { lat: 24.799448, lng: 120.979021 }
  destination = { lat: 24.799524, lng: 120.975017 };
  
  public renderOptions: any = {
    suppressMarkers: true,
  }

  public markerOptions = {
      origin: {
          icon: 'assets/store.png',
          draggable: true,
      },
      destination: {
          icon: 'assets/home.png',
          draggable: true,
      },
  }

  marker!: TravelMarker;
  map: any;

  homeAddress!: string;
  storeAddress!: string;
  route: any;
  
  steps = ['package at warehouse', 'package sent from store', 'package arrived to destination'];
  activeStep = this.steps[0];
  
  couriers = ['motorcycle', 'car'];
  selectedCourier = this.couriers[0]
  
  public onDirectionChange(event: any){

    // console.log(event);
    if(
      this.origin.lat === event.request.origin.location.lat() &&
      this.origin.lng === event.request.origin.location.lng() &&
      this.destination.lat === event.request.destination.location.lat() &&
      this.destination.lng === event.request.destination.location.lng() &&
      !this.isFirst
    ) return;

    this.homeAddress = event.routes[0].legs[0].start_address;
    this.storeAddress = event.routes[0].legs[0].end_address;
    
    this.origin = { lat: event.request.origin.location.lat(), lng: event.request.origin.location.lng() };
    this.destination = { lat: event.request.destination.location.lat(), lng: event.request.destination.location.lng() };

    this.route = event.routes[0].overview_path;
    
    // this.activeStep = this.steps[0];
      // console.log(this.marker);      
      if(this.marker['marker']) {
        // this.marker.setMap(null);
        this.marker['marker']['path'] = [];  
        setTimeout(() => {
          // this.marker.setMap(this.map)
          this.marker.addLocation(this.route);
            this.marker.reset();
            this.marker.play();
        }, 1000);
      } else {
        this.marker.addLocation(this.route);
        this.marker.play()
      }
      // this.activeStep = this.steps[1];

      console.log(this.marker);
      if(this.isFirst) this.marker.event.onEvent((event: EventType, data: TravelData) => {
        console.log(event);
        console.log(data);
        switch (event) {
          case 'reset':
            this.activeStep = this.steps[0];
            break;
          case 'play':
          case 'checkpoint':
            this.activeStep = this.steps[1];
            break;
          case 'finished':
            this.activeStep = this.steps[2];
            break;
          default:
            break;
        }
      });
      
      this.isFirst = false;
  }

  onMapReady(map: any): void {
    this.map = map;
    const options: TravelMarkerOptions = {
      map,
      speed: 20,
      interval: 20,
      speedMultiplier: 1,
      markerOptions: {
        title: 'Travel Marker',
        icon: {
          url: 'assets/motorcycle.png',
          animation: google.maps.Animation.DROP,
          scaledSize: new google.maps.Size(30, 30),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(15, 15),
        },
      },
    };
    this.marker = new TravelMarker(options);
    
    // setTimeout(() => this.marker.play(), 1000);
  }

  onCourierChange(courier: any): void {
    const icon = {
      url: courier.$ngOptionLabel === 'car' ? 'assets/car.png' : 'assets/motorcycle.png',
      animation: google.maps.Animation.DROP,
      scaledSize: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(15, 15),
    };
    this.marker.setMarkerOptions({ icon });
  }


}
