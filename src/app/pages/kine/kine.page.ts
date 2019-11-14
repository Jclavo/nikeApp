import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService } from 'src/app/services/firebase/item.service';
import { LocationService } from 'src/app/services/firebase/location.service';

import { LocationModel } from '../../models/location.model';
import { ItemModel } from '../../models/item.model';

@Component({
  selector: 'app-kine',
  templateUrl: './kine.page.html',
  styleUrls: ['./kine.page.scss'],
})
export class KinePage implements OnInit {

  private item = new ItemModel('', '', '', '', 0, '','','');
  private locations: Array<LocationModel>;
  private webContent: string;


  constructor(private itemService: ItemService,
    private locationService: LocationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 

      this.webContent = '<br>';
      this.webContent = this.webContent + ' 1. https://mail.google.com/mail/u/0/#inbox <br>';
      this.webContent = this.webContent + ' 2. https://mail.google.com/mail/u/0/#inbox <br>';

    }

  ngOnInit() {

    this.item.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.item.id) {
      console.log('User', this.item.id);
      this.itemService.get(this.item.id).subscribe(dataItem => {
        this.item = dataItem;
      });
    }
    // else {
    //   console.log('User Empty', this.user.id);

    // }

    this.getAllActiveLocations();

  }

  save(formItem: NgForm) {

    this.item.name = formItem.value.name;
    this.item.phone = formItem.value.phone;
    this.item.address = formItem.value.address;
    this.item.price = formItem.value.price;

    if (this.item.id) {
      this.itemService.update(this.item).then(() => {
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
      this.itemService.create(this.item).then(() => {
        //this.router.navigateByUrl('/');
        console.log('Item added');
        this.router.navigate(['/home']);
        //this.showToast('Idea added');
      }, err => {
        //this.showToast('There was a problem adding your idea :(');
        console.log('There was a problem adding.....');
      });
    }

  }

  getAllActiveLocations() {
    this.locationService.getAllActive().subscribe(dataLocations => {
      //this.loading = false;
      if (dataLocations) {
        this.locations = dataLocations;
      }

      console.log("locations: ", this.locations);
    });
  }

  selectLocation(id: string) {
    console.log(id)
    // this.location.latitude = latitude;
    // this.location.longuitude = longuitude;
  }

}
