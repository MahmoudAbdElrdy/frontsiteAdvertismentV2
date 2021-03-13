
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { marker } from 'src/app/shared/services/marker.image';
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit, OnDestroy {
  public event: EventEmitter<any> = new EventEmitter();

  triggerEvent() {
    this.event.emit({data: 12345});
  }
  @Input()
  width: string;
  @Input()
  height: string;

  @Input()
  address = '';

  @Input() 
  latitude: number = 24.7444191;
  @Input()
  longitude: number =46.8323063;

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

  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<AddLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    if (this.data) {
      this.latitude = +this.data.latitude;
      this.longitude = +this.data.longitude;
      this.search = this.data.address;
      this.address = this.data.address;
    }
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
  }
  closeDialog() {
  
    this.dialogRef.close({
      latitude: this.latitude,
      longitude: this.longitude,
      address: this.address,
      
    });
    console.log(this.latitude)
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
