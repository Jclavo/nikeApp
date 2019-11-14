import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

import { ItemModel } from '../../models/item.model';
import { ConstantService } from '../constant.service';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  private resultRAW: any;
  private resultObservable: Observable<ItemModel[]>;
  //private 

  constructor(private afs: AngularFirestore,
    private constant: ConstantService) { }

  getAll(): Observable<ItemModel[]> {

    return this.afs.collection(this.constant.COLLECTION_NAME_ITEMS).snapshotChanges()
      .pipe(map(res => {

        this.resultRAW = res;

        return this.resultObservable = this.resultRAW.map(itemData => {
          
          return new ItemModel(
            itemData.payload.doc.id,
            itemData.payload.doc.data().name,
            itemData.payload.doc.data().phone,
            itemData.payload.doc.data().address,
            itemData.payload.doc.data().price,
            itemData.payload.doc.data().location
          );

         });
      }));
  }

  get(id: string): Observable<ItemModel> {
    return this.afs.collection(this.constant.COLLECTION_NAME_ITEMS).doc<ItemModel>(id).valueChanges()
      .pipe(map(itemData => {
        
        return new ItemModel(
          id,
          itemData.name,
          itemData.phone,
          itemData.address,
          itemData.price,
          itemData.location
        );

      }));
  }

  create(item: ItemModel): Promise<DocumentReference> {

    return this.afs.collection(this.constant.COLLECTION_NAME_ITEMS).add({
      name:item.name,
      phone:item.phone,
      address:item.address,
      price:item.price,
      location:item.location
    });
  }

  update(item: ItemModel): Promise<void> {

    // return this.afs.collection('/users').update(
    //   user.id,
    // {
    //   name: user.name,
    //   lastname: user.lastname,
    //   age: user.age,
    // });

    return this.afs.collection(this.constant.COLLECTION_NAME_ITEMS).doc(item.id).set({
      name: item.name,
      phone:item.phone,
      address:item.address,
      price:item.price,
      location:item.location
    });
  }

  delete(id: string): Promise<void>
  {
    return this.afs.collection(this.constant.COLLECTION_NAME_ITEMS).doc(id).delete();
  }
}