import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import Map from 'ol/Map';
import OsmSource from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
import Feature from 'ol/Feature';


import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import * as proj from 'ol/proj';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConsts } from 'src/AppConsts';
import { GeoLocationService } from '../services/geo-location.service';

@Component({
  selector: 'app-osm-single-view',
  templateUrl: './osm-single-view.component.html',
  styleUrls: ['./osm-single-view.component.scss']
})
export class OsmSingleViewComponent implements OnInit {
  @Input()
  latitude: number = 29.9826335;
  @Input()
  longitude: number = 31.3140393;
  @Input() mapModal: boolean = false
  mapId;

  map: Map;
  vectorLayer = new VectorLayer();
  vectorSource = new Vector();
  pointedAddress: string;
  pointedAddressOrg: string;
  position: any;
  dirtyPosition;

  @Output()
  latlongChange = new EventEmitter();
  @Output()
  addressChanged = new EventEmitter<string>();
  @Output() addressChange: EventEmitter<any> = new EventEmitter<any>();

  reverseGeoSub: Subscription = null;
  OpenStreetMapService = AppConsts.maps.OpenStreetMapService;
  OpenStreetMapAutoCompleteService = AppConsts.maps.OpenStreetMapAutoCompleteService;

  constructor(private httpClient: HttpClient, private geoLocationService: GeoLocationService,
  ) {     this.mapId = "map" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

  ngOnInit(): void {

    // if (this.latitude === 0 && this.longitude === 0) {
    //   this.setCurrentLocation();
    // }

    // else {

    setTimeout(() => {
      this.loadMap();
      this.add_map_point(this.latitude, this.longitude);
      this.reverseGeo();
      this.vectorLayer = new VectorLayer({
        source: this.vectorSource,
        style: new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "./assets/img/GoogleMaps_Button.svg"
          })
        })
      });
      this.map.addLayer(this.vectorLayer);
    }, 100);
  
    // }

  }
  private loadMap() {
    this.map = new Map({
      target: this.mapId,
      layers: [
        new TileLayer({
          source: new OsmSource()
        })
      ],
      view: new View({
        center: fromLonLat([this.longitude, this.latitude]),
        zoom: 15
      })
    });
    setTimeout(() => {
      this.map.updateSize();
    }, 0);
  }


  setCurrentLocation() {
    this.geoLocationService.getLocation().subscribe((position) => {
      debugger;
      this.position = position;
      if (!this.dirtyPosition) {
        this.dirtyPosition = true;
        this.longitude = this.position.coords.longitude;
        this.latitude = this.position.coords.latitude;
        this.loadMap();

        this.add_map_point(this.latitude, this.longitude);
        this.reverseGeo();
        this.vectorLayer = new VectorLayer({
          source: this.vectorSource,
          style: new Style({
            image: new Icon({
              anchor: [0.5, 0.5],
              anchorXUnits: "fraction",
              anchorYUnits: "fraction",
              src: "/assets/img/GoogleMaps_Button.svg"
            })
          })
        });
        this.map.addLayer(this.vectorLayer);
      }
    });
  }
  getCoord(event: any) {
    if (event.target.className != 'ol-zoom-in' && event.target.className != 'ol-zoom-out') {
      var coordinate = this.map.getEventCoordinate(event);
      const lonlat = proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
      this.longitude = lonlat[0];
      this.latitude = lonlat[1];
      // put a marker at our selected position
      this.reset_map_point(coordinate);
      this.map.getView().setCenter(proj.transform([this.longitude, this.latitude], 'EPSG:4326', 'EPSG:3857'));
      this.reverseGeo();
    }
  }
  add_map_point(lat, lng) {
    this.vectorSource.clear();
    this.vectorSource.addFeature(new Feature({
      geometry: new Point(proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
    }));
  }

  reset_map_point(coordinate) {
    this.vectorSource.clear();
    this.vectorSource.addFeature(new Feature({
      geometry: new Point(coordinate),
    }));
  }
  reverseGeo() {
    const service = (this.OpenStreetMapService || '')
      .replace(new RegExp('{lon}', 'ig'), `${this.longitude}`)
      .replace(new RegExp('{lat}', 'ig'), `${this.latitude}`);
    this.reverseGeoSub = this.httpClient.get(service).subscribe((data) => {
      const val = data || {};
      if (!val['error']) {
        this.addressChange.emit(val['display_name']);
        this.pointedAddressOrg = val['display_name'];

        const address = [];

        const building = [];
        if (val['address']['building']) {
          building.push(val['address']['building']);
        }
        if (val['address']['mall']) {
          building.push(val['address']['mall']);
        }
        if (val['address']['theatre']) {
          building.push(val['address']['theatre']);
        }

        const zip_city = [];
        if (val['address']['postcode']) {
          zip_city.push(val['address']['postcode']);
        }
        if (val['address']['city']) {
          zip_city.push(val['address']['city']);
        }
        const street_number = [];
        if (val['address']['street']) {
          street_number.push(val['address']['street']);
        }
        if (val['address']['road']) {
          street_number.push(val['address']['road']);
        }
        if (val['address']['footway']) {
          street_number.push(val['address']['footway']);
        }
        if (val['address']['pedestrian']) {
          street_number.push(val['address']['pedestrian']);
        }
        if (val['address']['house_number']) {
          street_number.push(val['address']['house_number']);
        }

        if (building.length) {
          address.push(building.join(' '));
        }
        if (zip_city.length) {
          address.push(zip_city.join(' '));
        }
        if (street_number.length) {
          address.push(street_number.join(' '));
        }

        this.pointedAddress = address.join(', ');

        this.latlongChange.emit({
          latitude: this.latitude,
          longitude: this.longitude,
          address: this.pointedAddressOrg,
        });

        this.addressChanged.emit(this.pointedAddress);
      }

    });
  }
}