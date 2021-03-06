import {Qualia} from "./qualia.model";
import {Entanglement} from "./entanglement.model";
import {Observable, BehaviorSubject} from "rxjs";
import {ReflectiveInjector} from '@angular/core';
import {Utils} from '../utils';

var utils = new Utils();
export class ConceptForm {

  db_id:number;
  db_label:string;
  db_variable:string = utils.generateGuid();
  qualias:Qualia[] = [];
  entanglements:Entanglement[] = [];
  formSubmissionReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  existingForm:boolean;
  debug: boolean = false;
  showButtons: boolean = true;
  constructor(
    conceptLabel:string,
    payload:any,
    conceptId?:number){
    this.db_label = conceptLabel;
    console.log(conceptId);
    //let injector = ReflectiveInjector.resolveAndCreate([DataService]);
  //  this.dataService = injector.get(DataService);
    if(conceptId!==undefined){
      this.existingForm = true;
      this.db_id = conceptId;
    }else{
      this.existingForm = false;
    }
    console.log(payload);
    this.initializeQualias(payload.qualias);
    this.initializeEntanglements(payload.entanglements);
  }


  submitForm(){}

  checkIfFormSubmissionReady(){

  }

  checkIfValuesAreSubmissionReady(){
    var status = true;
    var modified = false;
    for(var i in this.qualias){
      let qualia = this.qualias[i];
      //console.log(`${qualia.display_name}: ${qualia.submission_ready.value}`);
      if(qualia.modified===true){
      modified = true;
      }
      if(qualia.submission_ready.value === false){
        status = false;
      }
    }
    for(var i in this.entanglements){
      let entanglement = this.entanglements[i];
      if(entanglement.modified===true){
      modified = true;
      }
      //console.log(`${entanglement.display_name}: ${entanglement.submission_ready.value}`);
      if(entanglement.submission_ready.value === false){
        status = false;
      }
    }

    if(status === true && modified === false){
      status = false;
    }

    this.formSubmissionReady.next(status);
  }



  checkIfEntanglementIsSubmissionReady(){}

  collectModifiedQualias(){}

  collectModifiedEntanglements(){}

  initializeQualias(qualias){
    for(var i in qualias){
      var qualia = qualias[i];
      if(qualia.data_type==='number' &&
        qualia.current_value!==null &&
        qualia.current_value !== undefined){

        console.log(qualia);
        qualia.current_value = qualia.current_value.low;
      }
    //  console.log(qualias);
      this.qualias.push(new Qualia(qualia));
      this.qualias[i].submission_ready
        .subscribe(
          (data)=>{
              if(data === false){
                this.formSubmissionReady.next(false);
              }else if(data === true){
                this.checkIfValuesAreSubmissionReady();
              }
          }
        )
    }
    this.checkIfValuesAreSubmissionReady();
  }

  getEntanglementFieldByType(db_type){
    var fieldIndex= utils.getElementIndexByKeyValue(
      this.entanglements, 'db_type',db_type);
    return this.entanglements[fieldIndex];
  }

  setQualiaFieldValue(db_key, value){
    this.getQualiaFieldByType(db_key)
      .updated_value.setValue(value);
  }

  setEntanglementFieldValue(db_key, value, db_variable){
    var ent = this.getEntanglementFieldByType(db_key);
      ent.updated_value.setValue(value);
      ent.updated_value_db_variable = db_variable;
  }

  getQualiaFieldByType(db_key){
    var fieldIndex= utils.getElementIndexByKeyValue(
      this.qualias, 'db_key',db_key);
    return this.qualias[fieldIndex];
  }

  setDebugger(value){
    this.debug = value;
    for(var i in this.qualias){
      this.qualias[i].debug = value;
    }
    for(var i in this.entanglements){
      this.entanglements[i].debug = value;
    }
  }

  setButtons(value){
    this.showButtons = value;
  }

  initializeEntanglements(entanglements){
    for(var i in entanglements){
      var entanglement = entanglements[i];
    //  console.log(entanglements);
      this.entanglements.push(new Entanglement(entanglement));
      this.qualias[i].submission_ready
        .subscribe(
          (data)=>{
              if(data === false){
                this.formSubmissionReady.next(false);
              }else if(data === true){
                //this.checkIfQualiasAreSubmissionReady();
              }
          }
        )
        this.checkIfValuesAreSubmissionReady();
    }
  }

}
