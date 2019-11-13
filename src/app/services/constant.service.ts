import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  public COLLECTION_NAME: string = "/items"

  constructor() { }
}
