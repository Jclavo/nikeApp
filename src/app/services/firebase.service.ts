import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { UserModel } from '../models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private resultRAW: any;
  private resultObservable: Observable<UserModel[]>;

  constructor(private afs: AngularFirestore) { }

  getUsers(): Observable<UserModel[]> {

    return this.afs.collection('/users').snapshotChanges()
      .pipe(map(res => {

        this.resultRAW = res;

        return this.resultObservable = this.resultRAW.map(userData => {
          return new UserModel(
            userData.payload.doc.id,
            userData.payload.doc.data().name,
            userData.payload.doc.data().lastname,
            userData.payload.doc.data().age,
          );

        });
      }));
  }

  getUser(id: string): Observable<UserModel> {
    return this.afs.collection('/users').doc<UserModel>(id).valueChanges()
      .pipe(map(userData => {

        return new UserModel(
          id,
          userData.name,
          userData.lastname,
          userData.age
        );

      }));
  }

  saveUser(user: UserModel): Promise<DocumentReference> {

    return this.afs.collection('/users').add({
      name: user.name,
      lastname: user.lastname,
      age: user.age,
    });
  }

  updateUser(user: UserModel): Promise<void> {

    // return this.afs.collection('/users').update(
    //   user.id,
    // {
    //   name: user.name,
    //   lastname: user.lastname,
    //   age: user.age,
    // });

    return this.afs.collection('/users').doc(user.id).set({
      name: user.name,
      lastname: user.lastname,
      age: user.age,
    });
  }

  deleteUser(id: string): Promise<void>
  {
    return this.afs.collection('/users').doc(id).delete();
  }
}