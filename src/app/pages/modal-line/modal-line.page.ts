import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { LineModel } from '../../models/line.model';

//Helpers
import { Validation } from '../../helpers/validations';

@Component({
  selector: 'app-modal-line',
  templateUrl: './modal-line.page.html',
  styleUrls: ['./modal-line.page.scss'],
})
export class ModalLinePage implements OnInit {

  @Input() title: string;
  @Input() linesInput: Array<string> = [];
  //variables
  private lines: Array<LineModel> = [];

  constructor(public modalController: ModalController,
    private validation: Validation) { }

  ngOnInit() {

    if(!this.validation.isEmptyArray(this.linesInput)) this.linesInput.forEach(value => this.lines.push(new LineModel(value)));
    //if(this.linesInput.length > 0) this.linesInput.forEach(value => this.lines.push(new LineModel(value)));

  }

  addLine() {
    this.lines.push(new LineModel(null));
  }


  dismiss() {
    let lines: Array<string> = [];

    this.lines.filter(function (value, index, arr) {
      lines.push(value.line);
    });

    this.modalController.dismiss({
      'linesOutput': lines
    });
  }

  // i = index
  delete(i) {
    this.lines = this.lines.filter(function (value, index, arr) {
      return index != i;
    });
  }

}
