import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LocationService } from 'src/app/services/firebase/location.service';
import { LocationModel } from '../../models/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  private location = new LocationModel('','unknown','','',true);

  private locations: Array<LocationModel>;

  constructor(private locationService: LocationService,
              private router: Router) { }

  ngOnInit() {
  }
  
  save(formLocation: NgForm) {
    console.log(formLocation.value);
    this.location.latitude = formLocation.value.latitude;
    // this.location.latitude = 'formLocation.value.latitude';
    this.location.longitude = formLocation.value.longitude;
    this.location.name = formLocation.value.name;
    this.location.active = formLocation.value.active;
    

    if (this.location.id) {
      this.locationService.update(this.location).then(() => {
        //this.router.navigateByUrl('/');
        console.log('Item updated');
        this.router.navigate(['/home']);
        //this.showToast('Idea added');
      }, err => {
        //this.showToast('There was a problem adding your idea :(');
        console.log('There was a problem updating.....');
      });
    }
    else {
      this.locationService.create(this.location).then(() => {
        this.router.navigateByUrl('/');
        console.log('Item added');
        this.router.navigate(['/home']);
        //this.showToast('Idea added');
      }, err => {
        //this.showToast('There was a problem adding your idea :(');
        console.log('There was a problem adding.....');
      });
    }
  }
  
}
