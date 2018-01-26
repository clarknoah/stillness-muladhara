import { Qualia } from './qualia.model';
import { Entanglement } from './entanglement.model';
import { ConceptForm } from './concept-form.model';
import { Utils } from '../utils';

const utils = new Utils;

export class SubmissionPayload{
  requesting_user = {};
  load_variables = [];
  load_entanglement_variables = [];
  create_concepts = [];
  set_qualias= [];
  create_entanglements = [];
  delete_entanglements = [];
  archive_concepts = [];
  return_results = [];
  construct(){

  }
  constructor(){}

  archiveConcept(id, label){
    var archive = {
      id:id,
      label:label,
      variable: utils.generateGuid()
    };
    this.archive_concepts.push(archive);
    this.addLoadVariable(archive.variable, archive.id, archive.label);
    return this.returnPayload();
  }


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
      console.log(qualia);
      var submission_ready = (qualia.submission_ready.value === true &&
                              qualia.modified === true);
      if(submission_ready){
        newConceptQualias[qualia.db_key] = qualia.updated_value.value;
      }
    }
    //Assign variable logic here, I forget
    new_concept.qualias = newConceptQualias;
    this.create_concepts.push(new_concept);
  }

  prepareEntanglementsForSubmission(db_variable:string, entanglements:Entanglement[]){
    for(var i in entanglements){
      var new_entanglement = {
        source_key:null,
        target_key:null,
        db_name:null
      };
      var entanglement = entanglements[i];
      console.log(entanglement.updated_value_db_variable);
      var submission_ready = (entanglement.modified === true && entanglement.submission_ready.value === true);
      if(submission_ready){
        console.log("Submisssion Entanglement Ready");
        new_entanglement.db_name = entanglement.db_type;
        new_entanglement.source_key = this.getEntanglementSourceKey(
          db_variable, entanglement
        );
        new_entanglement.target_key = this.getEntanglementTargetKey(
          db_variable, entanglement
        );
        console.log(new_entanglement);
        this.create_entanglements.push(new_entanglement);

      }
    }
  }

  getEntanglementSourceKey(conceptVariable, entanglement){
    if(entanglement.creator === 'source'){
      return conceptVariable;
    }else if(entanglement.creator === 'target'){
      if(entanglement.updated_value.value!==null){
        console.log("###HOLEPUNCHER###");
        this.addLoadVariable(
          entanglement.updated_value_db_variable,
            entanglement.updated_value.value,
           entanglement.current_selected_object.label);
      }
      return entanglement.updated_value_db_variable;
    }
  }

  getEntanglementTargetKey(conceptVariable, entanglement){
    if(entanglement.creator === 'target'){
      return conceptVariable;
    }else{
      if(entanglement.updated_value.value!==null){
        console.log("###HOLEPUNCHER###");
        this.addLoadVariable(
          entanglement.updated_value_db_variable,
            entanglement.updated_value.value,
           entanglement.current_selected_object.label);
      }
      return entanglement.updated_value_db_variable;
    }
  }

  prepareExistingConceptFormForSubmission(concept:ConceptForm){
    var concept_variable = concept.db_variable;
    var db_id = concept.db_id;
    var concept_label = concept.db_label;
    var qualias = concept.qualias;
    var entanglements = concept.entanglements;
    this.addLoadVariable(concept_variable, db_id, concept_label);
    console.log(this.load_variables);
    this.prepareQualiaChanges(concept_variable, concept.qualias);
    this.prepareEntanglementChanges(concept_variable, concept.entanglements);
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

  prepareEntanglementChanges(db_variable:string, entanglements:Entanglement[]){
    for(var i in entanglements){
      var new_entanglement = {
        source_key:null,
        target_key:null,
        db_name:null
      };
      var entanglement = entanglements[i];
      var submission_ready =
      (entanglement.submission_ready.value === true
        && entanglement.modified === true);

        if(submission_ready){
              if(entanglement.entanglement_id){
                console.log(entanglement);
                console.log(this.load_variables);
                var guid = utils.generateGuid();
                console.log(guid);
                this.addEntanglementLoadVariable(
                  guid,
                  entanglement.entanglement_id);
                console.log(this.load_variables);
                this.deleteEntanglement(guid);
                console.log(this.load_variables);

              }
              console.log("Submisssion Entanglement Ready");
              new_entanglement.db_name = entanglement.db_type;
              new_entanglement.source_key = this.getEntanglementSourceKey(
                db_variable, entanglement
              );
              console.log(this.load_variables);
              new_entanglement.target_key = this.getEntanglementTargetKey(
                db_variable, entanglement
              );
              console.log(this.load_variables);
              console.log(new_entanglement);
              this.create_entanglements.push(new_entanglement);

            }
      }
    }


  exportPayload(){}
  addEntanglementLoadVariable(variable, e_id){
    var ent_variable = {
      id:e_id,
      key:variable
    };
    this.load_entanglement_variables.push(ent_variable);
    this.deduplicateEntanglementVariables();

  }
  addLoadVariable(variable, db_id, concept_label){
    var load_variable = {
      key:variable,
      id:db_id,
      label:concept_label
    };
    this.load_variables.push(load_variable);
  //  this.deduplicateVariables();
  }

 deleteEntanglement(variable){
   var del = {
     key:variable
   };
   this.delete_entanglements.push(del);
 }

  deduplicateVariables(){
    this.load_variables = utils
    .removeDuplicates(this.load_variables, 'key');
  }
  deduplicateEntanglementVariables(){
    this.load_entanglement_variables = utils
    .removeDuplicates(this.load_entanglement_variables, 'key');
  }
  returnPayload(){
    var payload = {
      requesting_user:this.requesting_user,
      load_variables: this.load_variables,
      load_entanglement_variables: this.load_entanglement_variables,
      create_concepts: this.create_concepts,
      set_qualias: this.set_qualias,
      create_entanglements: this.create_entanglements,
      delete_entanglements: this.delete_entanglements,
      archive_concepts: this.archive_concepts,
      return_results: this.return_results
    };
    console.log(payload);
    return payload;
  }

}
