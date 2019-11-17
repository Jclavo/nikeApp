import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { KinePage } from './kine.page';

import { StarRatingModule } from 'ionic4-star-rating';


const routes: Routes = [
  {
    path: '',
    component: KinePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StarRatingModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [KinePage]
})
export class KinePageModule {}
