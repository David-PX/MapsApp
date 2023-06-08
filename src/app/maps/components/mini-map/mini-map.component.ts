import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number];
  @Input() zoom?: number;
  @ViewChild('map') divMap?: ElementRef;


  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement) throw "Map Div Not Found";
    if (!this.lngLat) throw "LngLat can not be null";

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15,
      interactive:false// starting zoom
      });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map);
  }

}
