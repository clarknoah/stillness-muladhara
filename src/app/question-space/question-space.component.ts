import { Component, OnInit } from '@angular/core';
import {Observable } from 'rxjs';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import { DataService } from '../services/data.service';
import {Utils} from '../utils';
import {ConceptForm} from '../models/concept-form.model';
import { Router } from '@angular/router';
 var utils = new Utils();
@Component({
  selector: 'question-space',
  templateUrl: './question-space.component.html',
  styleUrls: ['./question-space.component.css']
})

export class QuestionSpaceComponent implements OnInit {

  selectedEditor: string;
  concepts: any[];
  entanglements: any[];
  conceptSelected: boolean = false;
  selectedConceptExists: boolean = false;
  selectedConcept: any;
  selectedConceptForm: any;
  selectedConceptFormReady: boolean = false;
  selectedConceptFormCtrl: any;
  newConceptForm: ConceptForm;

  qualiaSelected: boolean = false;
  selectedQualia: any;
  selectedQualiaExists: boolean = false;
  selectedQualiaForm: ConceptForm;
selectedQualiaFormReady: boolean = false;

  entanglementSelected: boolean = false;
  selectedEntanglement: any;
  selectedEntanglementExists: boolean =  false;
  selectedEntanglementForm: any;
  selectedEntanglementFormReady: boolean = false;
  newEntanglementForm: ConceptForm;
  selectedEntanglementFormCtrl: any;


  conceptQualiaList: any;

  constructor(private dataService: DataService, private router: Router) {
    this.selectedEditor="concepts";
    this.updateConceptList();

   }

  ngOnInit() {
  }

  resetPage(){
    this.updateConceptList();
    this.updateEntanglementList();
    this.returnToConceptList();
    this.returnToEntanglementList();
    this.selectedQualiaForm = undefined;
    this.selectedQualiaExists = false;
    this.qualiaSelected = false;
    this.selectedQualiaFormReady = false;
  }

  returnToConceptList(){
    this.conceptSelected=false;
    this.selectedConceptExists = null;
    this.selectedQualiaForm = undefined;
    this.selectedQualiaExists = false;
    this.qualiaSelected = false;
    this.selectedQualiaFormReady = false;
  }

  returnToEntanglementList(){
    this.entanglementSelected=false;
    this.selectedEntanglementExists = null;
  }

  updateConceptList(){
    this.dataService.getConceptList('Concept','display_name').subscribe(
      (res)=>{
        var returnConcepts = utils.addKeyGuid(res.json(),'key');
        console.log(returnConcepts);
       this.concepts = returnConcepts;

      }
    )
    this.dataService.getConceptList('Entanglement','display_name').subscribe(
      (res)=>{
        var returnConcepts = utils.addKeyGuid(res.json(),'key');
        console.log(returnConcepts);
       this.entanglements = returnConcepts;

      }
    )
  }

  updateEntanglementList(){}

  loadExistingEntanglement(entanglement){
    var id = {id:entanglement.id.low};
    this.selectedEntanglement = entanglement;
    this.entanglementSelected = true;
    this.dataService.getExistingConceptForm(id.id,'Entanglement')
      .subscribe(
        (data)=>{
          this.selectedEntanglementForm = new ConceptForm(
            'Entanglement', data, id.id);
            this.selectedEntanglementForm.setDebugger(false);
            this.selectedEntanglementFormReady = true;
            this.selectedEntanglementExists = true;
        }
      );
  }

  loadExistingConcept(concept){
      console.log(concept);
      this.selectedConcept = concept;
      var conceptId = {id:concept.id.low};
      this.conceptSelected = true;
      //this.dataService.getExistingConceptForm(conceptId);
      this.dataService.getCentralDogmaConceptQualias(conceptId)
        .subscribe((data)=> {
          this.conceptQualiaList = utils.addKeyGuid(data.json(),'key');
          console.log(this.conceptQualiaList);
          this.dataService.getExistingConceptForm(
            concept.id.low,concept.label)
            .subscribe(
              (data)=>{
                this.selectedConceptForm = new ConceptForm(
                  concept.label, data, conceptId.id);
                    this.selectedConceptForm.setDebugger(false);
                  this.selectedConceptFormReady = true;
                  this.selectedConceptExists = true;
              }
            );

        });
  }

  loadConceptQualias(){}

  loadNewQualiaForm(){
    this.qualiaSelected = true;
    this.selectedQualiaExists = false;
    this.dataService.getNewConceptForm('Qualia')
      .subscribe(
        (data)=>{
          this.selectedQualiaForm = new ConceptForm(
            'Qualia',data.json()
          );
            this.selectedQualiaForm.setDebugger(false);
          console.log("searching");
          var field = this
            .selectedQualiaForm
            .getEntanglementFieldByType('approved_qualia');
            console.log(field);
            field.is_editable = false;
            field.updated_value.setValue(this.selectedConcept.id.low);
          this.selectedQualiaFormReady = true;


        }
      );
  }

  loadExistingQualiaForm(qualia){
    this.selectedQualia = qualia;
    this.qualiaSelected = true;
    this.selectedQualiaExists = true;
    this.dataService.getExistingConceptForm(qualia.id.low,'Qualia')
      .subscribe(
        (data)=>{
          this.selectedQualiaForm = new ConceptForm(
            'Qualia',data, qualia.id.low
          );
          console.log("searching");
          var field = this
            .selectedQualiaForm
            .getEntanglementFieldByType('approved_qualia');
            console.log(field);
            field.is_editable = false;
          this.selectedQualiaFormReady = true;


        }
      );
  }

  loadNewConceptForm(){
    this.conceptSelected = true;
    this.dataService.getNewConceptForm('Concept')
      .subscribe(
        (data)=>{
          console.log(data.json());
          this.newConceptForm = new ConceptForm(
            'Concept', data.json());
            this.selectedConceptExists = false;
            this.selectedConceptFormReady = true;
        }
      );


  }


  deleteConcept(){}

  deleteQualia(){}


  formStatus(event){
    console.log(event);
    if(event === "submissionSuccessful"){
      this.dataService.updateCentralDogma()
        .subscribe(
          (data)=>{
            console.log(data);
            this.resetPage();
          }
        );
    }
  }

  loadNewEntanglementForm(){
    this.selectedEntanglementExists = false;
    this.entanglementSelected = true;
    console.log("Loading New Entanglement");
    this.dataService.getNewConceptForm('Entanglement')
      .subscribe(
        (data)=>{
          console.log(data.json());
          this.newEntanglementForm = new ConceptForm(
            'Entanglement', data.json());
            this.selectedEntanglementFormReady = true;
        }
      );

  }

  deleteEntanglement(){}

}
