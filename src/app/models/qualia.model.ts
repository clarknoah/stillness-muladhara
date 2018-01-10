import { FormControl,Validators } from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';

export class Qualia {
  current_value: any;
  current_value$: Observable<any>;
  updated_value: any;
  updated_value$: FormControl;
  eq_type: "qualia";
  data_type: string;
  default_value: any;
  placeholder: any;
  qualia_db_name: string;
  mandatory_field: boolean;
  field_order: number;
  is_edittable: boolean;
  select_options: any[];
  display_name: string;
  hint: string;
  validators: any[];
  modified:boolean;
  form_control: FormControl;
  constructor(payload: any, id?:number){
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
    this.eq_type = "qualia";
    this.data_type = payload.data_type;
    this.default_value = payload.default_value;
    this.placeholder = payload.placeholder;
    this.qualia_db_name = payload.qualia_db_name;
    this.mandatory_field = payload.mandatory_field;
    this.field_order = payload.field_order;
    this.is_edittable = payload.is_edittable;
    this.select_options = payload.select_options;
    this.display_name = payload.display_name;
    this.hint = payload.hint;
    this.updated_value = new FormControl(this.assignCurrentValue(),this.assignValidators());
    this.updated_value.valueChanges
      .subscribe(
        (newValue)=>{
          console.log(newValue);
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

  checkUpdate(newValue){
    if(newValue !== this.current_value && this.updated_value.status === 'VALID'){
        console.log("Field has been Changed!");
        this.modified = true;
    }
  }

  assignCurrentValue(){
    this.modified = false;
    if(this.current_value === null &&
      this.default_value !== null){
        this.modified = true;
      return this.default_value;
    }else if(this.current_value!==null){
      return this.current_value;
    }else{
      return null;
    }
  }

}
