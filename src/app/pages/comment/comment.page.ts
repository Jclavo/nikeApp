import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  // Data passed in by componentProps
  @Input() commentsInput: Array<string>;
  //variables
  private comments: Array<CommentModel> = [];

  constructor(public modalController: ModalController) { }

  ngOnInit() {

    this.commentsInput.forEach(value => console.log(this.comments.push(new CommentModel(value))));
    console.log(this.comments);
  }

  addLine() {
    this.comments.push(new CommentModel(null));
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    let comments: Array<string> = [];

    this.comments.filter(function (value, index, arr) {
      // return index != i;
      comments.push(value.comment);
    });

    console.log(comments);
    this.modalController.dismiss({
      'dismissed': true,
      'comments': comments
    });
  }

  // i 0 index
  delete(i) {
    console.log(i);
    this.comments = this.comments.filter(function (value, index, arr) {
      return index != i;
    });
  }

}
