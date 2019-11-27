import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProgressIndicatorService {

  

  constructor(private loadingController: LoadingController) { }

  
  createLoading(): Promise<HTMLIonLoadingElement>
  {
    const loading = this.loadingController.create({
      message: 'Loading'
      //duration: 2000
    });

    return loading;
  }
  
  // async loadingPresent()
  // {
  //   await this.loading.present();
  // }

  // // async loadingDissmiss()
  // // {
  // //   await this.loading.dissmiss();
  // // }
}
