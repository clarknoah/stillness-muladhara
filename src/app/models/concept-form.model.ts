import {Qualia} from "./qualia.model";
import {Entanglement} from "./entanglement.model";
import {Observable, BehaviorSubject} from "rxjs";
//import {DataService} from "../services/data.service";
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
  //formSubmissionReady$: Observable<boolean> = this.formSubmissionReady.asObservable();
  existingForm:boolean;
  //dataService: DataService;
  constructor(
    conceptLabel:string,
    payload:any,
    conceptId?:number){
    this.db_label = conceptLabel;
    //let injector = ReflectiveInjector.resolveAndCreate([DataService]);
  //  this.dataService = injector.get(DataService);
    if(conceptId){
      this.existingForm = true;
    }else{
      this.existingForm = false;
    }
    console.log(payload);
    this.initializeQualias(payload.qualias);
    this.initializeEntanglements(payload.entanglements);
  //  var payload = this.dataService.getTestConceptForm()
  //    .subscribe(
  //      (data)=>{
  //        this.initializeQualias(data.qualias);
  //        this.initializeEntanglements(data.entanglements);
  //
  //    );

  }


  submitForm(){}

  checkIfFormSubmissionReady(){

  }

  checkIfValuesAreSubmissionReady(){
    let status = true;
    for(var i in this.qualias){
      let qualia = this.qualias[0];
      console.log(`${qualia.display_name}: ${qualia.submission_ready.value}`);
      if(qualia.submission_ready.value === false){
        status = false;
      }
    }
    for(var i in this.entanglements){
      let entanglement = this.entanglements[0];
      console.log(`${entanglement.display_name}: ${entanglement.submission_ready.value}`);
      if(entanglement.submission_ready.value === false){
        status = false;
      }
    }
    this.formSubmissionReady.next(status);
  }



  checkIfEntanglementIsSubmissionReady(){}

  collectModifiedQualias(){}

  collectModifiedEntanglements(){}

  initializeQualias(qualias){
    for(var i in qualias){
      var qualia = qualias[i];
      console.log(qualias);
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
        this.checkIfValuesAreSubmissionReady();
    }
  }

  initializeEntanglements(entanglements){
    for(var i in entanglements){
      var entanglement = entanglements[i];
      console.log(entanglements);
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
