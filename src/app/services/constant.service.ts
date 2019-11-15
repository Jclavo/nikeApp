import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  public COLLECTION_NAME_ITEMS: string = "/items";
  public COLLECTION_NAME_LOCATIONS: string = "/locations";
  public COLLECTION_NAME_COMMENTS: string = "/comments";

  constructor() { }
}
