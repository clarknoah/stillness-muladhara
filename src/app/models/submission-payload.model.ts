import { Qualia } from './qualia.model';
import { Entanglement } from './entanglement.model';
import { ConceptForm } from './concept-form.model';
import { Utils } from '../utils';


export class SubmissionPayload{
  requesting_user = {};
  load_variables = [];
  create_concepts = [];
  set_qualias= [];
  create_entanglements = [];
  delete_entanglements = [];
  archive_concepts = [];
  return_results = [];
  construct(){

  }
  constructor(){}

  prepareNewConceptFormForSubmission(concept:ConceptForm){
    var db_variable = concept.db_variable;
    var concept_label = concept.db_label;
    var qualias = concept.qualias;
    var entanglements = concept.entanglements;

    this.prepareNewConceptFormQualiasForSubmission(concept_label, db_variable, concept.qualias);
    this.prepareEntanglementsForSubmission(db_variable, concept.entanglements);
    return this.returnPayload();

  }
  prepareNewConceptFormQualiasForSubmission(concept_label:string, db_variable:string, qualias:Qualia[]){
    var new_concept = {
      key:db_variable,
      label:concept_label,
      qualias:{}
    };
    var newConceptQualias = {};
    for(var i in qualias){
      var qualia = qualias[i];
      var submission_ready = (qualia.submission_ready.value === true && qualia.modified === true);
      if(submission_ready){
        newConceptQualias[qualia.db_key] = qualia.updated_value.value;
      }
    }
    //Assign variable logic here, I forget
    this.create_concepts.push(newConceptQualias);
  }
  prepareEntanglementsForSubmission(db_variable:string, entanglements:Entanglement[]){
    var new_entanglement = {
      source_key:null,
      target_key:null,
      db_name:null
    };
    for(var i in entanglements){
      var entanglement = entanglements[i];
      var submission_ready = (entanglement.modified === true && entanglement.submission_ready.value === true);
      if(submission_ready){
        new_entanglement.db_name = entanglement.db_type;
      //  new_entanglement.source_key = entanglement.getSourceKey(db_variable);
      //  new_entanglement.target_key = entanglement.getTargetKey(db_variable);

      }
    }
  }


  prepareExistingConceptFormForSubmission(concept:ConceptForm){
    var concept_variable = concept.db_variable;
    var db_id = concept.db_id;
    var concept_label = concept.db_label;
    var qualias = concept.qualias;
    var entanglements = concept.entanglements;
    console.log(db_id);
    this.addLoadVariable(concept_variable, db_id, concept_label)
    this.prepareQualiaChanges(concept_variable, concept.qualias);
    //TODO Github Issue #63
    //this.prepareEntanglementChanges();
    return this.returnPayload();

  }


  prepareQualiaChanges(concept_variable:string, qualias:Qualia[]){

    for(var i in qualias){
      var qualia = qualias[i];
      var submission_ready = (qualia.submission_ready.value === true && qualia.modified === true);
      if(submission_ready){
        var set_qualia = {
          new_value:qualia.updated_value.value,
          concept_variable:concept_variable,
          db_key:qualia.db_key,
          data_type:qualia.data_type
        };
       this.set_qualias.push(set_qualia);
      }
    }
    console.log(this.set_qualias);
  }
  prepareEntanglementChanges(concept_variable:string, entanglements:Entanglement[]){
    for(var i in entanglements){
      var entanglement = entanglements[i];
      var submission_ready = (entanglement.submission_ready.value === true
        && entanglement.modified === true);
      if(submission_ready){

      }
    }

  console.log(this.set_qualias);
  }

  exportPayload(){}
  addLoadVariable(variable, db_id, concept_label){
    var load_variable = {
      key:variable,
      id:db_id,
      label:concept_label
    };
    this.load_variables.push(load_variable);
    this.deduplicateVariables();
  }
  deduplicateVariables(){
  //  this.load_variables = utils.dedupe(this.load_variables);
  }
  returnPayload(){
    var payload = {
      requesting_user:this.requesting_user,
      load_variables: this.load_variables,
      create_concepts: this.create_concepts,
      set_qualias: this.set_qualias,
      create_entanglements: this.create_entanglements,
      delete_entanglements: this.delete_entanglements,
      archive_concepts: this.archive_concepts,
      return_results: this.return_results
    };
    return payload;
  }

}
