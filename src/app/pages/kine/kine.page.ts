import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ModalLinePage } from '../modal-line/modal-line.page';
import { ImageGalleryPage } from '../image-gallery/image-gallery.page';


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

  private item = new ItemModel(null, null, null, null, 0, null, null, null, [], [],0,[]);
  private locations: Array<LocationModel>;
  // private comments: Array<CommentModel>;
  private websites: string;
  private comments: string;


  constructor(private itemService: ItemService,
    private locationService: LocationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController) {
  }

  ngOnInit() {

    this.item.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.item.id) {
      console.log('User', this.item.id);
      this.itemService.get(this.item.id).subscribe(dataItem => {
        this.item = dataItem;
        this.comments = this.item.comments.join("\n");
        this.websites = this.item.websites.join("\n");
      });
    }

    // else {
    //   console.log('User Empty', this.user.id);

    // }

    this.getAllActiveLocations();

  }

  save(formItem: NgForm) {

    // this.item.name = formItem.value.name;
    // this.item.phone = formItem.value.phone;
    // this.item.address = formItem.value.address;
    // this.item.price = formItem.value.price;

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
    console.log(data);
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
    console.log(data);
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
    console.log(data);
    if (data.imagesOutput) {
      this.item.images = data.imagesOutput;
      //this.images = this.item.images.join("\n");
    }
  }

  logRatingChange(rating) {
    console.log("changed rating: ", rating);
    // do your stuff
  }

}
