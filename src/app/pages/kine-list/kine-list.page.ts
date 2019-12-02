import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//MODELS
import { ItemModel } from '../../models/item.model';
import { AlertController } from '@ionic/angular';

//SERVICES
import { ItemService } from 'src/app/services/firebase/item.service';
import { AlertService } from '../../services/alert.service';
import { ProgressIndicatorService } from '../../services/progress-indicator.service';
import { ConstantService } from '../../services/constant.service';

@Component({
  selector: 'app-kine-list',
  templateUrl: './kine-list.page.html',
  styleUrls: ['./kine-list.page.scss'],
})
export class KineListPage implements OnInit {

  public items: Array<ItemModel>;

  constructor(private itemService: ItemService,
    private router: Router,
    private alertService: AlertService,
    private alertController: AlertController,
    private progressIndicatorService: ProgressIndicatorService,
    private constantService: ConstantService) {
    this.items = [];
  }

  ngOnInit() {

    this.getAll();
  }

  async getAll()
  {
    const loading = await this.progressIndicatorService.createLoading();
    loading.present();
    
    this.itemService.getAll().subscribe(dataItems => {
      if (dataItems.length) {
        this.items = dataItems;
        console.log('Items ',dataItems);
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
}
