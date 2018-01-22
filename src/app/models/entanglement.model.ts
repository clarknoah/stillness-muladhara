import { FormControl,Validators } from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
export class Entanglement {
  db_id: number;
  hint: string;
  eq_type:string = "entanglement";
  cardinality:string;
  db_type:string;
  creator:string;
  entanglement_id:number;
  display_name:string;
  currentActionRequired:string;
  field_order:number;
  mandatory_field: boolean;
  source_concept:string;
  is_edittable: boolean;
  target_concept:string;
  validators: any[];
  current_value: any;
  updated_value: FormControl;
  updated_value_db_variable: any;
  current_selected_object: any;
  modified: boolean;
  current_display: string;
  debug: boolean = false;
  submission_ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(payload, id?){
    this.constructVariables(payload);
    this.debug = true;
  }

  constructVariables(payload:any){
    this.current_value = payload.current_value;
    this.db_type = payload.db_type;
    this.mandatory_field = payload.mandatory_field;
    this.field_order = payload.field_order;
    this.is_edittable = payload.is_edittable;
    this.display_name = payload.display_name;
    this.hint = payload.hint;
    this.source_concept = payload.source_concept;
    this.target_concept = payload.target_concept;
    this.cardinality = payload.cardinality;
    this.creator = payload.creator;
    this.updated_value = new FormControl(this.assignCurrentValue(),this.assignValidators());
    this.updated_value_db_variable = null;
    if(this.current_value!==null){
      this.current_display = payload.current_display_name;
      this.entanglement_id = payload.entanglement_id;
    }
    this.updated_value.valueChanges
      .subscribe(
        (data)=>{
          console.log(data);
          this.checkUpdate(data);
        }
      );
  }

  assignValidators():any[] {
      var validators = [];
      if(this.mandatory_field===true){
        validators.push(Validators.required)
      }
      return validators;
  }

  constructNewValue(){}

  constructExistingValue(){

  }

  deleteField(){
    this.updated_value.setValue(null);
  }



  checkUpdate(newValue){
    console.log(`
current value:${this.current_value}
updated value:${this.updated_value.value}
      `);

    if(newValue === null
      && this.current_value === null
      && this.updated_value.status !== "VALID"){
        this.modified = false;
        this.submission_ready.next(false);
      }
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

  generateSubmissionEntanglement(){
    if(this.submission_ready.value === true){

    }else{
      console.log("Entanglement is not ready for submission");
    }
  }

  //TODO
  getUpdatedValueLoadVariable(){}

  getTargetKey(){}

  assignCurrentValue(){
    this.modified = false;
    this.submission_ready.next(false);
    if(this.current_value === null
      && this.mandatory_field === false)

    {
      this.submission_ready.next(true);
      return this.current_value;
    }

    else if(this.current_value===null
    && this.mandatory_field === true)

    {
      this.submission_ready.next(true);
      return this.current_value;
    }

    else if(this.current_value!==null){
      this.modified = false;
      this.submission_ready.next(true);
      return this.current_value;
    }
    else{
      console.log("Something has gone terribly wrong with the entanglements");
      return null;
    }
  }

}
