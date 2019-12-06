import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

//SERVICE
import { ItemService } from 'src/app/services/firebase/item.service';
import { LocationService } from 'src/app/services/firebase/location.service';
import { AlertService } from '../../services/alert.service';

//MODEL
import { LocationModel } from '../../models/location.model';
import { ItemModel, ItemListModel } from '../../models/item.model';

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.page.html',
  styleUrls: ['./modal-search.page.scss'],
})
export class ModalSearchPage implements OnInit {

  private locations: Array<LocationModel>;
  private item = new ItemListModel();

  constructor(private itemService: ItemService,
    private locationService: LocationService,
    private alertService: AlertService,
    private modalController: ModalController) { }

  ngOnInit() {

    this.getAllActiveLocations();
  } 

  getAllActiveLocations() {

    this.locationService.getAllActive().subscribe(dataLocations => {
      if (dataLocations.length) {
        this.locations = dataLocations;
      }
    });
  }

  dismiss() {

    this.modalController.dismiss({
      'itemSearched': this.item
    });
  }

}
