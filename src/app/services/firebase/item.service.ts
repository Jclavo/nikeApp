import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { ItemModel } from '../../models/item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private static COLLECTION_NAME: string = "/items"

  private resultRAW: any;
  private resultObservable: Observable<ItemModel[]>;

  constructor(private afs: AngularFirestore) { }

  getUsers(): Observable<ItemModel[]> {

    return this.afs.collection('/users').snapshotChanges()
      .pipe(map(res => {

        this.resultRAW = res;

        return this.resultObservable = this.resultRAW.map(userData => {
          return new ItemModel();
          // return new ItemModel(
          //   userData.payload.doc.id,
          //   userData.payload.doc.data().name,
          //   userData.payload.doc.data().lastname,
          //   userData.payload.doc.data().age,
          // );

        });
      }));
  }

  getUser(id: string): Observable<ItemModel> {
    return this.afs.collection(ItemService.COLLECTION_NAME).doc<ItemModel>(id).valueChanges()
      .pipe(map(userData => {
        return new ItemModel();
        // return new ItemModel(
        //   id,
        //   userData.name,
        //   userData.lastname,
        //   userData.age
        // );

      }));
  }

  create(item: ItemModel): Promise<DocumentReference> {

    return this.afs.collection(ItemService.COLLECTION_NAME).add({
      name:item.name,
      phone:item.phone,
      address:item.address,
      price:item.price
    });
  }

  updateUser(user: ItemModel): Promise<void> {

    // return this.afs.collection('/users').update(
    //   user.id,
    // {
    //   name: user.name,
    //   lastname: user.lastname,
    //   age: user.age,
    // });

    return this.afs.collection('/users').doc(user.id).set({
      name: user.name,
      // lastname: user.lastname,
      // age: user.age,
    });
  }

  deleteUser(id: string): Promise<void>
  {
    return this.afs.collection('/users').doc(id).delete();
  }
}