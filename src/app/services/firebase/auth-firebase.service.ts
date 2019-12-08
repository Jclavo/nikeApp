import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
//import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

//MODELS
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  register(user: UserModel) {
    // return new Promise<any>((resolve, reject) => {
    //   firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    //     .then(
    //       res => resolve(res),
    //       err => reject(err))
    // })
    // return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(user: UserModel) {
    // return new Promise<any>((resolve, reject) => {
    //   firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    //     .then(
    //       res => resolve(res),
    //       err => reject(err))
    // })
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails() {
    //return firebase.auth().currentUser;
    if (this.angularFireAuth.auth.currentUser === null) return null;
    return this.angularFireAuth.auth.currentUser.uid;
  }
}
