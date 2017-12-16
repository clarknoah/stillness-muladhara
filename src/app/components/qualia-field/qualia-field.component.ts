import { Component, OnInit, Input  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    console.log(this.qualiaField);
    this.qualiaControl = new FormControl(
      this.qualiaField.current_value,
      [Validators.required]
    );
  }

}
