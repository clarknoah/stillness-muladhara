import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Utils} from '../../utils';
var utils = new Utils();
@Component({
  selector: 'qualia-field',
  templateUrl: './qualia-field.component.html',
  styleUrls: ['./qualia-field.component.css']
})
export class QualiaFieldComponent implements OnInit {
  @Input() qualiaField: any;
  qualiaControl: FormControl;
  constructor() {

   }

  ngOnInit() {
    this.qualiaControl = new FormControl(
      this.qualiaField.current_value,
      [Validators.required]
    );
  }

  setUtcTimestamp(){
    this.qualiaField.control.setValue(utils.generateUtcTimestamp());
  }

}
