import { Component } from '@angular/core';
import {  Subscription, interval } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { LatLngLiteralList } from './models/marker.model';
import { MarkerLatLng } from './models/marker-latlng.model';
import { FormModel } from './models/form-input.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reto-tecnico-maersk-angular-maps';
  options = {
    center: {
      lat: -12.0526096, 
      lng: -77.069303
    },
    zoom: 14,
    strokeColor: 'red'
  }
  markerPositions: LatLngLiteralList[] = [];
  private intervalSubscription!: Subscription;
  currentMarker : MarkerLatLng[] = [];

  latitud: number =  0;
  longitud: number =  0;

  constructor() {
  }
  
  setLocation(event: any) {
    const ltlng = event.coords;
    this.latitud =  ltlng.lat;
    this.longitud =  ltlng.lng;
  }

  submit(data : FormModel){
    const ltlng = {
      lat: data.latitud,
      lng: data.longitud
    }
    this.markerPositions.push({
      position: ltlng,
      history: [ltlng]
    });
    if (!this.intervalSubscription || this.intervalSubscription.closed) {
      this.startInterval();
    }
  }
  
  startInterval() {
    this.intervalSubscription = interval(30000).pipe(
      mergeMap(() => this.markerPositions),
      tap(coordenada => this.actualizarPosicion(coordenada)),
      //take(this.markerPositions.length)
    ).subscribe();
  }

  actualizarPosicion(coordenada: any) {
    const directions = ['north', 'northeast', 'northwest','south'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const distance = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
    const position = this.calculateNewPosition(coordenada, randomDirection, distance);
    coordenada.position = position;
    coordenada.history.push(position);
  }

  calculateNewPosition(oldPosition: any, direction: string, distance: number): any {
    const earthRadius = 6378100;
    let bearing;
    switch (direction) {
      case 'north':
        bearing = 0;
        break;
      case 'northeast':
        bearing = 45;
        break;
      case 'northwest':
        bearing = 315;
        break;
      default:
        bearing = 0;
    }
    bearing = (bearing * Math.PI) / 180;
    const lat1 = oldPosition.position.lat * (Math.PI / 180);
    const lng1 = oldPosition.position.lng * (Math.PI / 180);
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance / earthRadius) +
      Math.cos(lat1) * Math.sin(distance / earthRadius) * Math.cos(bearing));
    const lng2 = lng1 + Math.atan2(Math.sin(bearing) * Math.sin(distance / earthRadius) * Math.cos(lat1),
      Math.cos(distance / earthRadius) - Math.sin(lat1) * Math.sin(lat2));
    return { lat: (lat2 * 180) / Math.PI, lng: (lng2 * 180) / Math.PI , distance: distance, orientation: direction};
  }

  clickedMarker(marker: any) {
    this.currentMarker = marker.history;
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
  
}
