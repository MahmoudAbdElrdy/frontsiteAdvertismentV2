
 import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnDestroy, Inject
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppConsts } from 'src/AppConsts';
import { marker } from '../services/marker.image';
@Component({
  selector: 'app-map-single-view',
  templateUrl: './map-single-view.component.html',
  styleUrls: ['./map-single-view.component.css']
})
export class MapSingleViewComponent implements OnInit, OnDestroy {
  @Input()
  width: string;
  @Input()
  height: string;

  @Input()
  address = '';

 

  // @Input()
  // latitudePointer = 52.520008;
  // @Input()
  // longitudePointer = 13.404954;

  @Input()
  showControlsZoom: boolean;
  @Input()
  titleZoomIn = 'Zoom in';
  @Input()
  titleZoomOut = 'Zoom out';
  @Input()
  showControlsCurrentLocation: boolean;
  @Input()
  titleCurrentLocation = 'Current location';
  @Output() mapOsmClicked = new EventEmitter();
  @Input()
  showDebugInfo: boolean;
  @Input()
  opacity = 1;
  @Input()
  zoom = 14;
  search;
  markerImage = marker;

  reverseGeoSub: Subscription = null;
  pointedAddress: string;
  pointedAddressOrg: string;

  position: any;
  dirtyPosition;
  @Output() latlongChange = new EventEmitter();
  searchList = [];
  @Output()
  addressChanged = new EventEmitter<string>();
  @ViewChild('map', { static: true }) map: any;

  @Output() addressChange: EventEmitter<any> = new EventEmitter<any>();
  viewMap = false;
  timeout;
  OpenStreetMapService = AppConsts.maps.OpenStreetMapService;
  OpenStreetMapAutoCompleteService = AppConsts.maps.OpenStreetMapAutoCompleteService;
  @Input() 
  latitude: number = 24.7444191;
  @Input()
  longitude: number =46.8323063;
  @Input() mapId: string = "map"

  constructor(
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    debugger;
      this.latitude = +this.latitude;
      this.longitude = +this.longitude;
      this.search = this.address;
      this.address = this.address;

    this.viewMap = true;
  }
  ngOnDestroy() {
    if (this.reverseGeoSub) {
      this.reverseGeoSub.unsubscribe();
    }
  }
  latlongChanges(value) {
    this.latitude = value.latitude;
    this.longitude = value.longitude;
    this.address = value.address;
    this.search = value.address;
    this.latlongChange.emit({
      latitude: this.latitude,
      longitude: this.longitude,
      address:this.address
     });
  }

  setAddress(lat, long, address) {
    this.viewMap = false;
    this.longitude = long;
    this.latitude = lat;
    this.address = address;
    this.search = address;
    setTimeout(() => {
      this.viewMap = true;
    }, 300);
  }

  keyDown() {
    clearTimeout(this.timeout);
  }
  searchAutoComplete() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.httpClient
        .get(this.OpenStreetMapAutoCompleteService + this.search)
        .subscribe((value: any) => {
          this.searchList = [];
          value.map((em) => {
            this.searchList.push({
              lat: em.lat,
              lon: em.lon,
              address: em.display_name,
            });
          });
        });
    }, 500);
  }
}
