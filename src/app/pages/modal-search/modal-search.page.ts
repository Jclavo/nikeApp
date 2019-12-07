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

  private option: string = "0";

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

  search() {
    let dataOK: boolean = false;
    switch (this.option) {
      case "1": // Name
        this.item.name ? dataOK = true : null;
        break;
      case "2": // Phone
        this.item.phone ? dataOK = true : null;
      case "3": // Price
        this.item.price ? dataOK = true : null;
      case "4": // Location
        this.item.location ? dataOK = true : null;
      case "5":
        dataOK = true
        // code block
        break;
      default:
      // code block
    }

    dataOK ? this.dismiss() : this.alertService.presentToast('Choose an option and fullfil data..');;
  }

  dismiss() {

    this.modalController.dismiss({
      'itemSearched': this.item,
      'option': this.option
    });
  }

}
