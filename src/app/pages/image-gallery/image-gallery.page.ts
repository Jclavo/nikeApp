import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

//MODELS
import { ImageModel } from '../../models/image.model';

//SERVICES
import { ImageService } from '../../services/image.service';
import { ConstantService } from '../../services/constant.service';
import { AlertService } from '../../services/alert.service';
import { ProgressIndicatorService } from '../../services/progress-indicator.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.page.html',
  styleUrls: ['./image-gallery.page.scss'],
})
export class ImageGalleryPage implements OnInit {

  @ViewChild('inputcamera', { static: false }) cameraInput: ElementRef;
  @Input() imagesInput: Array<string>;

  private images: Array<ImageModel> = [];

  constructor(private imageService: ImageService,
    private constantService: ConstantService,
    public modalController: ModalController,
    private alertService: AlertService,
    private progressIndicatorService: ProgressIndicatorService) { }

  ngOnInit() {

    this.imagesInput.forEach(value => this.images.push(new ImageModel(value, null, null, this.constantService.PATH_IMAGES + value)));
  }

  ionViewDidEnter() {

    let imageFile: any;

    const element = this.cameraInput.nativeElement as HTMLInputElement;

    element.onchange = () => {

      // Depois colocar um loading aqui!!!     
      const reader = new FileReader();

      reader.onload = (r: any) => {

        let base64 = r.target.result as string;

      };

      reader.readAsDataURL(element.files[0]);
      imageFile = element.files[0];

      let image = new ImageModel(null, element.files[0], this.constantService.APP_NAME, null);

      this.save(image);
    };
  }


  selectPicture() {
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.click();
  }

  async save(image: ImageModel) {

    const loading = await this.progressIndicatorService.createLoading();
    loading.present();

    // it can be send like an object from a class
    const formImage = new FormData();
    formImage.append('image', image.image, image.image.name);
    formImage.append('path', image.path);

    this.imageService.save(formImage).subscribe(dataImage => {
      dataImage.fullPath = this.constantService.PATH_IMAGES + dataImage.name;

      console.log('image', dataImage.name);
      this.images.push(dataImage);
      loading.dismiss();
    }, error => {
      this.alertService.presentToast('There was a problem updating.....' + error);
      loading.dismiss();
    }
    )
  }
  delete(id: string, name: string) {
    //this.imageStoreService.delete(id,name);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    let images: Array<string> = [];

    this.images.filter(function (value, index, arr) {
      images.push(value.name);
    });

    //console.log(lines);
    this.modalController.dismiss({
      'imagesOutput': images
    });
  }

}
