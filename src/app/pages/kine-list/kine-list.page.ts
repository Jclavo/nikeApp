import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

//MODELS
import { ItemModel, ItemListModel } from '../../models/item.model';
import { LocationModel } from '../../models/location.model';

//SERVICES
import { ItemService } from '../../services/firebase/item.service';
import { LocationService } from '../../services/firebase/location.service';
import { AlertService } from '../../services/alert.service';
import { ProgressIndicatorService } from '../../services/progress-indicator.service';
import { ConstantService } from '../../services/constant.service';

@Component({
  selector: 'app-kine-list',
  templateUrl: './kine-list.page.html',
  styleUrls: ['./kine-list.page.scss'],
})
export class KineListPage implements OnInit {

  public items: Array<ItemListModel>;
  private locations: Array<LocationModel>;

  constructor(private itemService: ItemService,
    private router: Router,
    private alertService: AlertService,
    private alertController: AlertController,
    private progressIndicatorService: ProgressIndicatorService,
    private constantService: ConstantService,
    private locationService: LocationService) {
    this.items = [];
  }

  ngOnInit() {

    this.getAllActiveLocations()
    this.getAll();
  }

  async getAll()
  {
    let these = this; //Donot do at home

    const loading = await this.progressIndicatorService.createLoading();
    loading.present();
    
    this.itemService.getAll().subscribe(dataItems => {
      if (dataItems.length) {
        this.items = dataItems;

        this.items = dataItems.map(function callback(value) {

          let item = new ItemListModel();

          item.id = value.id;
          item.name = value.name;
          item.phone = value.phone;
          item.address = value.address;
          item.price = value.price;
          //item.location = value.location;getLocationNameByID
          item.location = these.getLocationNameByID(value.location);

          item.rating = value.rating;
          item.images = value.images;
          item.test = value.test;
          return item;

        });


        //console.log('Items ',dataItems);
      }
      else
      {
        this.alertService.presentToast('Data not found .....');  
      }
      loading.dismiss();
    }, error => {
      this.alertService.presentToast('There was a problem getting.....' + error);
      loading.dismiss();
    })

  }

  async askForDelete(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you want to <strong>DELETE</strong> it?!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            this.delete(id);
          }
        }
      ]
    });

    await alert.present();
  }

  private async delete(id: string)
  {
    const loading = await this.progressIndicatorService.createLoading();
    loading.present();

    this.itemService.delete(id).then(() => {
      this.alertService.presentToast('User deleted');
    }, error => {
      this.alertService.presentToast('There was a problem deleting.....' + error);
    }).finally(() => {
      loading.dismiss();
    });
  }

  getAllActiveLocations() {

    this.locationService.getAllActive().subscribe(dataLocations => {
      if (dataLocations.length) {
        this.locations = dataLocations;
      }
     
    });
  }


  getLocationNameByID(id: string):string
  {
    let locationFind: Array<LocationModel>;
    
    locationFind = this.locations.filter(function (value, index, array) {
      if(value.id == id) 
       return value;    
    });

    if(locationFind.length > 0)
    {
      return locationFind[0].name;
    }
  }
}
