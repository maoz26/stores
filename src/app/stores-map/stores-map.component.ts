import {Component, ElementRef, NgZone, OnInit, Pipe, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import {AppService} from '../shared/services/store.service';
import {GeoCoord, HaversineService} from 'ng2-haversine';

@Component({
  selector: 'app-stores-map',
  styleUrls: ['stores-map.component.css'],
  templateUrl: 'stores-map.component.html',
})

export class StoresMapComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  retailers = [];
  best= [];
  public mapDistanceStore: Map<number, StoreDto>;
  public mapStoreToRetailer: Map<StoreDto, String>;
  public mapBestDistanceRetailer: Map<StoreDto, number>;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private storeService: AppService,
    private _haversineService: HaversineService
  ) {
    this.mapDistanceStore = new Map<number, StoreDto>();
    this.mapStoreToRetailer = new Map<StoreDto, string>();
    this.mapBestDistanceRetailer = new Map<StoreDto, 0>();
  }

  ngOnInit() {
    try {
      // set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      // create search FormControl
      this.searchControl = new FormControl();

      // set current position
      this.setCurrentPosition();

      // load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ['address']
        });
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // get the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            // set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;

            this.calculateDistances();
          });
        });
      });
    }catch (exc) {
      console.log(exc);
    }
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private calculateDistances() {
    // Read json of stores
    this.storeService.getStores().subscribe(res => {
      this.mapDistanceStore.clear();
      this.retailers = res.json() as RetailerDto[];
      this.retailers.map(retailer => {
        retailer.branches.map(store => {
          this.mapStoreToRetailer.set(store, retailer.name);
          this.mapDistanceStore.set(this.getDistance(store.coordinates, {
            latitude: this.latitude, longitude: this.longitude}), store);
        });
      });
      console.log(this.mapDistanceStore);
      this.bestSpreading();
    });
  }

  // calculate distance between 2 coordinates
  private getDistance(store1: CoordinateDto, store2: CoordinateDto): number {
    return this._haversineService.getDistanceInKilometers(store1 , store2);
  }

  // get keys from distance-store map
  public getStoreDistances() {
    return Array.from(this.mapDistanceStore.keys());
  }

  // get retailer name from store-retailer map
  public getRetailerName(distance: number) {
    return this.mapStoreToRetailer.get(this.mapDistanceStore.get(distance));
  }

  // get store from  distance-store map
  public getStoreDto(distance: number) {
    return this.mapDistanceStore.get(distance);
  }

  // find best spreading retailer in 50km
  public bestSpreading() {
    let curRetailer;
    let max;
    this.best = Array.from(this.mapDistanceStore.keys());
    // console.log(this.best);
    for (let i = 0 ; i < this.best.length; i++) {
      if (this.best[i] < 50) {
        curRetailer = this.getRetailerName(this.best[i]);
        this.mapBestDistanceRetailer.set(curRetailer, this.mapBestDistanceRetailer.get(curRetailer) + 1);
      }
      console.log(this.mapBestDistanceRetailer);
      max = Object.keys(this.mapBestDistanceRetailer).reduce(
        (a, b) => this.mapBestDistanceRetailer[a] > this.mapBestDistanceRetailer[b] ? a : b);
      console.log(max);
      const bestReailer = this.getByValue(this.mapBestDistanceRetailer, max);
      return bestReailer;
    }
  }

  // get key by value in map
  public getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue) {
        return key;
      }
    }
  }

}
