import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LocationService } from '../../services/firebase/location.service';
import { AlertService } from '../../services/alert.service';
import { ProgressIndicatorService } from '../../services/progress-indicator.service';


import { LocationModel } from '../../models/location.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  private location = new LocationModel('', 'unknown', '', '', true);

  private locations: Array<LocationModel> = [];

  constructor(private locationService: LocationService,
    private router: Router,
    private alertService: AlertService,
    private loadingController: LoadingController,
    private progressIndicatorService: ProgressIndicatorService) { }

  async ngOnInit() {

    const loading = await this.progressIndicatorService.createLoading();
    loading.present();

    this.locationService.getAll().subscribe(dataLocations => {
      if (dataLocations) {
        this.locations = dataLocations;
      }
      loading.dismiss();
    });
  }

  async save(formLocation: NgForm) {
    
    const loading = await this.progressIndicatorService.createLoading();
    loading.present();

    console.log(formLocation.value);
    this.location.latitude = formLocation.value.latitude;
    this.location.longitude = formLocation.value.longitude;
    this.location.name = formLocation.value.name;
    this.location.active = formLocation.value.active;

    if (this.location.id) {
      this.locationService.update(this.location).then(() => {
        this.alertService.presentToast('Item updated');
        formLocation.reset();
      }, error => {
        this.alertService.presentToast('There was a problem updating.....' + error);
      }).finally(() => {
        loading.dismiss();
      });
       
    }
    else {
      this.locationService.create(this.location).then(() => {
        this.alertService.presentToast('Item added');
        formLocation.reset();
      }, error => {
        this.alertService.presentToast('There was a problem adding.....' + error);
      }).finally(() => {
        loading.dismiss();
      });
    }

    this.location = new LocationModel('', 'unknown', '', '', true);
  }

  async delete(id: string) {
    const loading = await this.progressIndicatorService.createLoading();
    loading.present();
    
    this.locationService.delete(id).then(() => {
      this.alertService.presentToast('Location deleted');
    }, error => {
      this.alertService.presentToast('There was a problem deleting.....' + error);
    }).finally(() => {
      loading.dismiss();
    });
  }

  update(id: string) {
    this.locationService.get(id).subscribe(dataLocation => {
      this.location = dataLocation;
    });
  }

  // async presentLoading() {

  //    const loading = await this.loadingController.create({
  //     message: 'Loading',
  //     duration: 2000
  //   });
  //   await loading.present();

  //   await loading.dismiss();

  //   console.log('Loading dismissed!');
  // }

}
