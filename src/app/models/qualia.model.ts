import { FormControl,Validators } from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import * as moment_ from 'moment';
import {Utils} from '../utils';

var utils = new Utils();
const moment = moment_;

export class Qualia {
  current_value: any;
  updated_value: FormControl;
  eq_type: string = "qualia";
  data_type: string;
  default_value: any;
  placeholder: any;
  db_key: string;
  mandatory_field: boolean;
  field_order: number;
  is_editable: boolean;
  select_options: any[];
  display_name: string;
  hint: string;
  validators: any[];
  modified:boolean;
  debug: boolean = false;
  submission_ready: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(payload: any, id?:number){
    //TODO THis is SIN! I need to remove this null bandaid!
    if(payload.default_value="null"){
      payload.default_value = null;
    }
    this.debug = true;
    if(id){
      this.constructExistingQualia(payload);
    }else{
      this.constructNewQualia(payload);
    }
  }

  constructNewQualia(payload:any): void{
      this.current_value = payload.default_value;
      this.constructVariables(payload);
  }

  constructExistingQualia(payload:any):void{
    this.constructVariables(payload);
  }


  constructVariables(payload:any):void{
    this.current_value = payload.current_value;
    this.data_type = payload.data_type;
    this.default_value = payload.default_value;
    this.placeholder = payload.placeholder;
    this.db_key = payload.db_key;
    this.mandatory_field = payload.mandatory_field;
    this.field_order = payload.field_order;
    this.is_editable = payload.is_editable;
    this.select_options = payload.select_options;
    this.display_name = payload.display_name;
    this.hint = payload.hint;
    this.updated_value = new FormControl(this.assignCurrentValue(),this.assignValidators());
    this.updated_value.valueChanges
      .subscribe(
        (newValue)=>{
          this.checkUpdate(newValue);

        }
      );
  }

  updateQualiaValue(updatedValue){
    this.updated_value = updatedValue;
  }

  assignValidators():any[] {
      var validators = [];
      if(this.mandatory_field===true){
        validators.push(Validators.required)
      }
      return validators;
  }

  getSubmissionStatus(){

  }

  checkUpdate(newValue){

    if(newValue === this.current_value
      && this.current_value !== null
      && this.updated_value.status === "VALID")
      {
        this.modified = false;
        this.submission_ready.next(true);
      }
      else if(newValue !== this.current_value
      && this.updated_value.status !== 'VALID' )
      {
        this.modified = true;
        this.submission_ready.next(false);
      }
      else if(newValue !== this.current_value
      && this.updated_value.status === 'VALID')
      {
        this.modified = true;
        this.submission_ready.next(true);
      }
  }

  assignCurrentValue(){
    this.modified = false;
    this.submission_ready.next(false);
    if(this.current_value === null &&
      this.default_value !== null){
        this.modified = true;
        this.submission_ready.next(true);
      return this.default_value;
    }else if(this.current_value!==null){
      this.submission_ready.next(true);
      return this.current_value;
    }else{
      return null;
    }
  }

  setDate(){
    this.updated_value.setValue(console.log(moment().format('YYYY-MM-DD')));
  }
  setUtcTimestamp(){
    this.updated_value.setValue(utils.generateUtcTimestamp());
  }

}
