import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  map?: Map;
  zoom: number = 10;

  public currentLngLat: LngLat = new LngLat(-69.95165106597574, 18.493937933850262);

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';


    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }


  public mapListeners(): void{
    if(!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (event) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (event) => {
      if (this.map!.getZoom() < 18) return ;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
    });


  }

  public ZoomIn(): void {
    this.map?.zoomIn();
  }


  public ZoomOut(): void {
    this.map?.zoomOut();
  }

  zoomChanged(value:string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }




}
