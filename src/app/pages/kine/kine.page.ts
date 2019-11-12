import { Component, OnInit } from '@angular/core';

import { ItemModel } from '../../models/item.model';

@Component({
  selector: 'app-kine',
  templateUrl: './kine.page.html',
  styleUrls: ['./kine.page.scss'],
})
export class KinePage implements OnInit {

  private item = new ItemModel();
  
  constructor() { }

  ngOnInit() {
  }

  save()
  {
    
  }

}
