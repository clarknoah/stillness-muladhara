import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable, BehaviorSubject, Subject} from 'rxjs';
import {Qualia} from '../models/qualia.model';

@Component({
  selector: 'playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  field: FormControl;
  qualiaField: Qualia;
  form = {
    field1: new FormControl('',[Validators.required,Validators.minLength(3)]),
    field2: new FormControl('',[Validators.required,Validators.minLength(3)]),
    validForm: new BehaviorSubject<boolean>(false),
    validForm$: undefined
  };

  constructor() {
    var payload = {
      current_value:null,
      updated_value: 'frank',
      eq_type: "qualia",
      data_type: 'string',
      default_value: 'bob',
      placeholder: 'Name of Variable',
      qualia_db_name: 'name_of_variable',
      mandatory_field: true,
      field_order: 1,
      is_edittable: true,
      select_options: [],
      display_name: 'Name of Variable',
      hint: 'Name',
      validators:[]
    };
    this.qualiaField = new Qualia(payload);
    this.form.validForm$ = this.form.validForm.asObservable();
    this.form.validForm$.subscribe(
        data=>console.log(`ValidForm Value: ${data}`)
      )
    this.form.field1.valueChanges
      .subscribe(
        (data)=>{
          console.log(data);
          console.log(`Status: ${this.form.field1.status}`);
          this.form.validForm.next(this.validCheck());
          console.log(`BehaviorSubject: ${this.form.validForm.value}`)
        }
      );
      this.form.field2.valueChanges
        .subscribe(
          (data)=>{
            console.log(data);
            console.log(`Status: ${this.form.field1.status}`);
            this.form.validForm.next(this.validCheck());
          }
        );
  }

  ngOnInit() {
  }

  validCheck():boolean{
    var validArr = [false, false];
    validArr[0] = (this.form.field1.status==='VALID');
    validArr[1] = (this.form.field2.status==='VALID');
    var formValid = true;
    for(var i in validArr){
      if(validArr[i]===false){
        console.log("Form Not Valid");
        formValid = false;
      }
    }
    return formValid;
  }

}
