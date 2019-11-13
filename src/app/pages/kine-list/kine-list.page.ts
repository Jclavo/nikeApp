import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemService } from 'src/app/services/firebase/item.service';

import { ItemModel } from '../../models/item.model';

@Component({
  selector: 'app-kine-list',
  templateUrl: './kine-list.page.html',
  styleUrls: ['./kine-list.page.scss'],
})
export class KineListPage implements OnInit {

  public items: Array<ItemModel>;

  constructor(private itemService: ItemService,
    private router: Router) {
    this.items = [];
  }

  ngOnInit() {

    this.itemService.getAll().subscribe(dataItems => {
      //this.loading = false;
      if (dataItems) {
        this.items = dataItems;
      }

      console.log("items: ", this.items);
    });

  }

  delete(id: string)
  {
    this.itemService.delete(id).then(() => {
      console.log('User deleted');
      //this.showToast('Idea added');
    }, err => {
      //this.showToast('There was a problem adding your idea :(');
      console.log('There was a problem deleting.....');
    });
  }


}
