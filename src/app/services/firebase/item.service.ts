import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

import { ItemModel, ItemListModel } from '../../models/item.model';
import { ConstantService } from '../constant.service';

//Helpers
import { Validation } from '../../helpers/validations';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  private resultRAW: any;
  private resultObservable: Observable<ItemModel[]>;
  //private 

  constructor(private afs: AngularFirestore,
    private constant: ConstantService,
    private validation: Validation) { }

  getAll(): Observable<ItemModel[]> {

    return this.afs.collection(this.constant.COLLECTION_NAME_ITEMS).snapshotChanges()
      .pipe(map(res => {

        this.resultRAW = res;

        return this.resultObservable = this.resultRAW.map(itemData => {

          return this.createItem(
            itemData.payload.doc.id,
            itemData.payload.doc.data().name,
            itemData.payload.doc.data().phone,
            itemData.payload.doc.data().address,
            itemData.payload.doc.data().price,
            itemData.payload.doc.data().location,
            itemData.payload.doc.data().latitude,
            itemData.payload.doc.data().longitude,
            itemData.payload.doc.data().comments,
            itemData.payload.doc.data().websites,
            itemData.payload.doc.data().socialNetworks,
            itemData.payload.doc.data().rating,
            itemData.payload.doc.data().images,
            itemData.payload.doc.data().test
          );

        });
      }));
  }

  get(id: string): Observable<ItemModel> {
    return this.afs.collection(this.constant.COLLECTION_NAME_ITEMS).doc<ItemModel>(id).valueChanges()
      .pipe(map(itemData => {

        return this.createItem(
          id,
          itemData.name,
          itemData.phone,
          itemData.address,
          itemData.price,
          itemData.location,
          itemData.latitude,
          itemData.longitude,
          itemData.comments,
          itemData.websites,
          itemData.socialNetworks,
          itemData.rating,
          itemData.images,
          itemData.test
          )

      }));
  }

  create(item: ItemModel): Promise<DocumentReference> {

    return this.afs.collection(this.constant.COLLECTION_NAME_ITEMS).add({
      name: item.name,
      phone: item.phone,
      address: item.address,
      price: item.price,
      location: item.location,
      latitude: item.latitude,
      longitude: item.longitude,
      comments: item.comments,
      websites: item.websites,
      socialNetworks: item.socialNetworks,
      rating: item.rating,
      images: item.images,
      test: item.test
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
      phone: item.phone,
      address: item.address,
      price: item.price,
      location: item.location,
      latitude: item.latitude,
      longitude: item.longitude,
      comments: item.comments,
      websites: item.websites,
      socialNetworks: item.socialNetworks,
      rating: item.rating,
      images: item.images,
      test: item.test
    });
  }

  delete(id: string): Promise<void> {
    return this.afs.collection(this.constant.COLLECTION_NAME_ITEMS).doc(id).delete();
  }


  search(item: ItemListModel): Observable<ItemModel[]> {

    // https://firebase.google.com/docs/reference/js/firebase.database.Query
    // https://medium.com/android-dev-moz/firebasesql-8bab8efd1e95

    return this.afs.collection(this.constant.COLLECTION_NAME_ITEMS,
      //ref => ref.where("name", "==", item.name)) // WHERE
      ref => ref.orderBy('name').startAt(item.name).endAt(item.name+"\uf8ff")) // LIKE
      


      .snapshotChanges()
      .pipe(map(res => {

        this.resultRAW = res;

        return this.resultObservable = this.resultRAW.map(itemData => {

          return this.createItem(
            itemData.payload.doc.id,
            itemData.payload.doc.data().name,
            itemData.payload.doc.data().phone,
            itemData.payload.doc.data().address,
            itemData.payload.doc.data().price,
            itemData.payload.doc.data().location,
            itemData.payload.doc.data().latitude,
            itemData.payload.doc.data().longitude,
            itemData.payload.doc.data().comments,
            itemData.payload.doc.data().websites,
            itemData.payload.doc.data().socialNetworks,
            itemData.payload.doc.data().rating,
            itemData.payload.doc.data().images,
            itemData.payload.doc.data().test
          );

        });
      }));
  }






  private createItem(id: string,
    name: string,
    phone: string,
    address: string,
    price: number,
    location: string,
    latitude: string,
    longitude: string,
    comments: Array<string>,
    websites: Array<string>,
    socialNetworks: Array<string>,
    rating: number,
    images: Array<string>,
    test: boolean
  ) {

    //Validations
    id = this.validation.parseToString(id);
    name = this.validation.parseToString(name);
    phone = this.validation.parseToString(phone);
    address = this.validation.parseToString(address);
    price = this.validation.isEmptyString(price.toString()) ? 0 : price;
    location = this.validation.parseToString(location);
    latitude = this.validation.parseToString(latitude);
    longitude = this.validation.parseToString(longitude);
    comments = this.validation.parseToArray(comments);
    websites = this.validation.parseToArray(websites);
    socialNetworks = this.validation.parseToArray(socialNetworks);
    rating = this.validation.isEmptyString(rating.toString()) ? 0 : rating;
    images = this.validation.parseToArray(images);

    // Do not do it at home
    //test = this.validation.isEmptyString(<string><unknown>test)? false : true;
    test = this.validation.isBoolean(test);

    return new ItemModel(
      id,
      name,
      phone,
      address,
      price,
      location,
      latitude,
      longitude,
      comments,
      websites,
      socialNetworks,
      rating,
      images,
      test
    );
  }


}