import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  public COLLECTION_NAME_ITEMS: string = "/items";
  public COLLECTION_NAME_LOCATIONS: string = "/locations";
  public COLLECTION_NAME_COMMENTS: string = "/comments";
  //public SERVER: string = "http://127.0.0.1:8000";
  public SERVER: string = "https://commonapi.000webhostapp.com";
  public API_IMAGES: string = "https://commonapi.000webhostapp.com/api/images";
  public SERVER_FROM_IMAGES: string = this.SERVER + "/images/";
  public APP_NAME: string = "Kine-App";
  public PATH_IMAGES: string = this.SERVER_FROM_IMAGES + this.APP_NAME + '/';


  constructor() { }
}
