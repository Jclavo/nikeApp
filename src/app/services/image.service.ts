import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { ImageModel } from '../models/image.model';
import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  //private apiRoot: string = 'http://127.0.0.1:8000/api/images';

  private resultRAW: any;
  private resultObservable: Observable<ImageModel[]>;

  constructor(private httpClient: HttpClient,
    private constantService: ConstantService) { }

  save(image: any): Observable<ImageModel> {
    // return this.httpClient.post(this.apiRoot, genre);
    return this.httpClient.post(this.constantService.API_IMAGES, image).pipe(map(res => {

      this.resultRAW = res;
      // return this.resultObservable = this.resultRAW.data.map(dataImage => {

      return new ImageModel(
        this.resultRAW.data.name,
        null,
        image.path,
        null
      );
      // });

    }));
  }
}
