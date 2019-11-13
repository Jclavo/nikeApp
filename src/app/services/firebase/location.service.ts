import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

import { LocationModel } from '../../models/location.model';
import { ConstantService } from '../constant.service';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private resultRAW: any;
  private resultObservable: Observable<LocationModel[]>;
  //private 

  constructor(private afs: AngularFirestore,
    private constant: ConstantService) { }

  getAll(): Observable<LocationModel[]> {

    return this.afs.collection(this.constant.COLLECTION_NAME_LOCATIONS).snapshotChanges()
      .pipe(map(res => {

        this.resultRAW = res;

        return this.resultObservable = this.resultRAW.map(locationData => {
          
          return new LocationModel(
            locationData.payload.doc.id,
            locationData.payload.doc.data().name,
            locationData.payload.doc.data().phone,
            locationData.payload.doc.data().address,
            locationData.payload.doc.data().price
          );

         });
      }));
  }

  get(id: string): Observable<LocationModel> {
    return this.afs.collection(this.constant.COLLECTION_NAME_LOCATIONS).doc<LocationModel>(id).valueChanges()
      .pipe(map(locationData => {
        
        return new LocationModel(
          id,
          locationData.name,
          locationData.latitude,
          locationData.longuitude,
          locationData.active
        );

      }));
  }

  create(item: LocationModel): Promise<DocumentReference> {

    return this.afs.collection(this.constant.COLLECTION_NAME_LOCATIONS).add({
      name:item.name,
      phone:item.latitude,
      address:item.longuitude,
      price:item.active
    });
  }

  update(item: LocationModel): Promise<void> {


    return this.afs.collection(this.constant.COLLECTION_NAME_LOCATIONS).doc(item.id).set({
      name: item.name,
      phone:item.latitude,
      address:item.longuitude,
      price:item.active
    });
  }

  delete(id: string): Promise<void>
  {
    return this.afs.collection(this.constant.COLLECTION_NAME_LOCATIONS).doc(id).delete();
  }
}