import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//
import { Geolocation } from '@ionic-native/geolocation/ngx';
import leaflet from 'leaflet';

//MODAL
import { LocationModel } from '../../models/location.model';
import { ItemListModel, ItemModel } from '../../models/item.model';

//SERVICES
import { AlertService } from '../../services/alert.service';
import { LocationService } from '../../services/firebase/location.service';
import { ItemService } from '../../services/firebase/item.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  private currentLatitude: any;
  private currentLongitude: any;

  public map: any;
  public currentMarker: any;
  public markers: Array<any> = [];

  private locations: Array<LocationModel>;
  private location: string;
  private items: Array<ItemListModel>;

  constructor(private geolocation: Geolocation,
    private alertService: AlertService,
    private router: Router,
    private itemService: ItemService,
    private locationService: LocationService) { }

  ngOnInit() {
    // console.log('currentLatitude: ', this.currentLatitude);
    this.getCurrentCoordenates();
    this.getAllActiveLocations();
  }

  getCurrentCoordenates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Coordinates', resp);

      this.currentLatitude = resp.coords.latitude;
      this.currentLongitude = resp.coords.longitude;

      //this.map.remove();

      this.cargarMapa(this.currentLatitude, this.currentLongitude);
      //this.createMarker(this.latitudeNova, this.longitudeNova);
      //this.map = leaflet.map('mapId').setView([this.latitudeNova, this.longitudeNova], 13);


    }).catch((error) => {
      this.alertService.presentToast('Error getting location ..' + error);
      this.router.navigate(['/kine-list']);
    });
  }

  cargarMapa(latitude: any, longitude: any) {

    if (latitude === undefined || longitude === undefined) {
      this.alertService.presentToast('Error getting location ..');
      this.router.navigate(['/kine-list']);
    }
    else {
      this.map = leaflet.map('mapId').setView([latitude, longitude], 13);
    }

    //this.map = leaflet.map('mapId').setView([-15.793262, -47.883478], 13);
    //this.map = leaflet.map('mapId').setView([-15.83, -48.08]);

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.createMarker(latitude, longitude, this.createPopupMessage('0','Me', '0.0'));

  }

  // createMarker(latitude: any, longitude: any) {

  //   if (this.currentMarker) { // check
  //     this.map.removeLayer(this.currentMarker); // remove
  //   }
  //   this.currentMarker = leaflet.marker([latitude, longitude]).addTo(this.map);
  // }

  createMarker(latitude: any, longitude: any, popupMessage: string) {

    let indexMarker = this.markers.findIndex(function (currentValue, index, arr) {
      if (currentValue._latlng.lat == latitude && currentValue._latlng.lng == longitude)
        return index;
    }, this)


    if (indexMarker == -1) {
      //Add new markers
      this.markers.push(
        leaflet.marker([latitude, longitude]).addTo(this.map)
          .bindPopup(popupMessage)
          // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        //.openPopup()
      );
    }
    else
    {
      this.markers[indexMarker]._popup._content = this.markers[indexMarker]._popup._content + '<br>' + popupMessage;
    }

  }

  createPopupMessage(id: string, name: string, price: any)
  {
    // return '<b>ID:</b> ' + id + ' <b>Name:</b> ' + name + ' <b>Price:</b> ' + price ;
    if(id == "0") return '<p style="color:red;"><b>Me!!</b></p>';
    else return '<b>Name:</b> <a href="/kine/' + id + '" target="_blank">' + name + '</a> <b>Price:</b> ' + price ;

    // let popupMessage: string = "";
    // if(id == "0") popupMessage = '<b>Name:</b>' + name;
    // else popupMessage = '<b>Name:</b> <a href="/kine/' + id + '" target="_blank">' + name + '</a>';

    // return popupMessage + ' <b>Price:</b> ' + price ;
  }

  removeAllMarkers() {
    // Remove all market, except the current position
    // which is the first one

    if (this.markers.length > 1) {
      for (let i = 1; i < this.markers.length; i++) {
        this.map.removeLayer(this.markers[i]); // remove
      }
    }
  }

  loadMarkers() {

    this.removeAllMarkers();

    for (let i = 0; i < this.items.length; i++) {
      this.createMarker(
        this.items[i].latitude, this.items[i].longitude, 
        this.createPopupMessage(this.items[i].id, this.items[i].name, this.items[i].price)
        );
    }

  }

  selectLocation(locationID: string) {
    let item = new ItemListModel();

    item.location = locationID;

    this.search(item, "4"); // number 4 is the key to search location
  }


  getAllActiveLocations() {

    this.locationService.getAllActive().subscribe(dataLocations => {
      if (dataLocations.length) {
        this.locations = dataLocations;
      }

    });
  }

  search(item: ItemListModel, option: string) {

    this.itemService.search(item, option).subscribe(dataItemSearched => {

      this.items = dataItemSearched.filter(function (value, index, array) {

        // Delete which does not have Location (Latitude/Longitude)
        if (value.latitude.length > 1 && value.longitude.length > 1) {
          return item;
        }
      });

      this.alertService.presentToast(this.items.length + ': items found');
      this.items.length > 0 ? this.loadMarkers() : this.removeAllMarkers();

      // console.log('length: ', this.items);
      // if(this.items.length === 0)
      // {
      //   this.alertService.presentToast('No data found');
      // }
      // else {
      //   this.loadMarkers();
      // }

    });
  }


}
