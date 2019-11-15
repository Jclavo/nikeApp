import { Component, OnInit, Input } from '@angular/core';

import { CommentService } from '../../services/firebase/comment.service';

import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  // Data passed in by componentProps
  @Input() item_id: string;
  //variables
  private comments: Array<CommentModel>;
  
  constructor(private commentService: CommentService) { }

  ngOnInit() {

    // console.log(this.item_id);
    this.getByItem(this.item_id);
    this.comments = [];
  }

  getByItem(item_id: string)
  {
    this.commentService.getByItem(item_id).subscribe(dataComment=> {
      if(dataComment)
      {
        this.comments = dataComment;
      }
      
    });
  }

  addLine()
  {
    this.comments.push(new CommentModel('','',this.item_id));
  }

}
