import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

import { ModalLinePage } from '../modal-line/modal-line.page';
import { ImageGalleryPage } from '../image-gallery/image-gallery.page';

//SERVICE
import { ItemService } from 'src/app/services/firebase/item.service';
import { LocationService } from 'src/app/services/firebase/location.service';
import { AlertService } from '../../services/alert.service';
import { ProgressIndicatorService } from '../../services/progress-indicator.service';

//MODEL
import { LocationModel } from '../../models/location.model';
import { ItemModel } from '../../models/item.model';

//Helpers
import { Validation } from '../../helpers/validations';

@Component({
  selector: 'app-kine',
  templateUrl: './kine.page.html',
  styleUrls: ['./kine.page.scss'],
})
export class KinePage implements OnInit {

  private item = new ItemModel(null, null, null, null, 0, null, null, null, [], [], 0, []);
  private locations: Array<LocationModel>;
  // private comments: Array<CommentModel>;
  private websites: string;
  private comments: string;


  constructor(private itemService: ItemService,
    private locationService: LocationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private alertService: AlertService,
    private alertController: AlertController,
    private progressIndicatorService: ProgressIndicatorService,
    private validation: Validation) {
  }

  ngOnInit() {

    this.item.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.getAllActiveLocations();

    // if (this.item.id) {
    //   console.log('User', this.item.id);
    //   this.getById(this.item.id);
    // }

    // else {
    //   console.log('User Empty', this.user.id);

    // }
  }

  getById() {
    if (this.item.id) {
      this.itemService.get(this.item.id).subscribe(dataItem => {
        this.item = dataItem;
        this.comments = this.item.comments.join("\n");
        this.websites = this.item.websites.join("\n");
      });
    }
  }


  async save(formItem: NgForm) {

    //Validations
    if(   this.validation.isEmptyString(this.item.name)
        || this.validation.isEmptyString(this.item.phone) 
        || this.validation.isEmptyString(this.item.location) 
    )
    {
      this.alertService.presentToast('Data is required');
      return;
    }

    const loading = await this.progressIndicatorService.createLoading();
    loading.present();
    
    if (this.item.id) {
      this.itemService.update(this.item).then(() => {
        this.alertService.presentToast('Item updated');
        loading.dismiss();
        this.router.navigate(['/kine-list']);
      }, error => {
        this.alertService.presentToast('There was a problem updating.....' + error);
      }).finally(() => {
        loading.dismiss();
      });
    }
    else {
      this.itemService.create(this.item).then(() => {
        this.alertService.presentToast('Item added');
        loading.dismiss();
        this.router.navigate(['/kine-list']);
      }, error => {
        this.alertService.presentToast('There was a problem adding.....' + error);
      }).finally(() => {
        loading.dismiss();
      });
    }

  }

  getAllActiveLocations() {

    this.locationService.getAllActive().subscribe(dataLocations => {
      if (dataLocations.length) {
        this.locations = dataLocations;
      }
      this.getById();
    });
  }

  selectLocation(id: string) {
   // console.log(id)
  }

  async addComment() {
    const modal = await this.modalController.create({
      component: ModalLinePage,
      componentProps: {
        'title': 'Comments',
        'linesInput': this.item.comments
      }
    });

    await modal.present();

    // get data 
    const { data } = await modal.onWillDismiss();
    if(data === undefined) return;
    if (data.linesOutput) {
      this.item.comments = data.linesOutput;
      this.comments = this.item.comments.join("\n");
    }
  }

  async addWebsite() {
    const modal = await this.modalController.create({
      component: ModalLinePage,
      componentProps: {
        'title': 'Websites',
        'linesInput': this.item.websites
      }
    });

    await modal.present();

    // get data 
    const { data } = await modal.onWillDismiss();
    if(data === undefined) return;
    if (data.linesOutput) {
      this.item.websites = data.linesOutput;
      this.websites = this.item.websites.join("\n");
    }
  }

  async addImage() {
    const modal = await this.modalController.create({
      component: ImageGalleryPage,
      componentProps: {
        'imagesInput': this.item.images
      }
    });

    await modal.present();

    // get data 
    const { data } = await modal.onWillDismiss();
    if(data === undefined) return;
    if (data.imagesOutput) {
      this.item.images = data.imagesOutput;
    }
  }

  logRatingChange(rating) {
    //console.log("changed rating: ", rating);
    // do your stuff
  }

}
