import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Qualia } from '../../models/qualia.model';
import {Utils} from '../../utils';
var utils = new Utils();
@Component({
  selector: 'qualia-field',
  templateUrl: './qualia-field.component.html',
  styleUrls: ['./qualia-field.component.css']
})
export class QualiaFieldComponent implements OnInit {
  @Input() qualiaField: Qualia;
  qualiaControl: FormControl;
  constructor() {

   }

  ngOnInit() {
  }

  setUtcTimestamp(){
    this.qualiaField.updated_value.setValue(utils.generateUtcTimestamp());
  }

}
