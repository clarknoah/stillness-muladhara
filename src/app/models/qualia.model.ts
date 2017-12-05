import { FormControl } from '@angular/forms';

export class Qualia {
  current_value: any;
  updated_value: any;
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
  host_id: number;
  validators: any[];
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
    this.host_id = payload.host_id;
    this.constructVariables(payload);
  }

  constructVariables(payload:any):void{
    this.updated_value = null;
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
  }

  updateQualiaValue(updatedValue){
    this.updated_value = updatedValue;
  }


}
