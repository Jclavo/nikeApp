import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from 'src/app/services/firebase/item.service';

import { ItemModel } from '../../models/item.model';


@Component({
  selector: 'app-kine',
  templateUrl: './kine.page.html',
  styleUrls: ['./kine.page.scss'],
})
export class KinePage implements OnInit {

  private item = new ItemModel();

  constructor(private itemService: ItemService,
              private router: Router) { }

  ngOnInit() {
  }

  save(formItem: NgForm) {

    this.item.name = formItem.value.name;
    this.item.phone = formItem.value.phone;
    this.item.address = formItem.value.address;
    this.item.price = formItem.value.price;

    if (this.item.id) {
      this.itemService.updateUser(this.item).then(() => {
        //this.router.navigateByUrl('/');
        //this.router.navigate(['/home']);
        console.log('Item updated');
        //this.showToast('Idea added');
      }, err => {
        //this.showToast('There was a problem adding your idea :(');
        console.log('There was a problem updating.....');
      });
    }
    else {
      this.itemService.create(this.item).then(() => {
        //this.router.navigateByUrl('/');
        this.router.navigate(['/home']);
        console.log('Item added');
        //this.showToast('Idea added');
      }, err => {
        //this.showToast('There was a problem adding your idea :(');
        console.log('There was a problem adding.....');
      });
    }

  }

}
