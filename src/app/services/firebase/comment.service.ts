import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

import { CommentModel } from '../../models/comment.model';
import { ConstantService } from '../constant.service';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  private resultRAW: any;
  private resultObservable: Observable<CommentModel[]>;
  //private 

  constructor(private afs: AngularFirestore,
    private constant: ConstantService) { }

  getAll(): Observable<CommentModel[]> {

    return this.afs.collection(this.constant.COLLECTION_NAME_COMMENTS).snapshotChanges()
      .pipe(map(res => {

        this.resultRAW = res;

        return this.resultObservable = this.resultRAW.map(commentData => {

          return new CommentModel(
            commentData.payload.doc.id,
            commentData.payload.doc.data().comment,
            commentData.payload.doc.data().item_id
          );

        });
      }));
  }

  getByItem(item_id: string): Observable<CommentModel[]> {

    return this.afs.collection(this.constant.COLLECTION_NAME_COMMENTS,
      ref => ref.where("item_id", "==", item_id))
      .snapshotChanges()
      .pipe(map(res => {

        this.resultRAW = res;

        return this.resultObservable = this.resultRAW.map(commentData => {

          return new CommentModel(
            commentData.payload.doc.id,
            commentData.payload.doc.data().comment,
            commentData.payload.doc.data().item_id
          );

        });
      }));
  }

  get(id: string): Observable<CommentModel> {
    return this.afs.collection(this.constant.COLLECTION_NAME_COMMENTS).doc<CommentModel>(id).valueChanges()
      .pipe(map(commentData => {

        return new CommentModel(
          id,
          commentData.comment,
          commentData.item_id
        );

      }));
  }

  

  create(item: CommentModel): Promise<DocumentReference> {

    return this.afs.collection(this.constant.COLLECTION_NAME_COMMENTS).add({
      name: item.comment,
      phone: item.item_id,
    });
  }

  update(item: CommentModel): Promise<void> {

    return this.afs.collection(this.constant.COLLECTION_NAME_COMMENTS).doc(item.id).set({
      name: item.comment,
      phone: item.item_id,
    });
  }

  delete(id: string): Promise<void> {
    return this.afs.collection(this.constant.COLLECTION_NAME_COMMENTS).doc(id).delete();
  }
}