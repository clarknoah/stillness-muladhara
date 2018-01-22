import { Component, OnInit } from '@angular/core';
import {Observable } from 'rxjs';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import { DataService } from '../services/data.service';
import {Utils} from '../utils';
import {ConceptForm} from '../models/concept-form.model';
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

  entanglementSelected: boolean = false;
  selectedEntanglement: any;
  selectedEntanglementExists: boolean =  false;
  selectedEntanglementForm: any;
  selectedEntanglementFormReady: boolean = false;
  selectedEntanglementFormCtrl: any;


  conceptQualiaList: any;

  constructor(private dataService: DataService) {
    this.selectedEditor="concepts";
    this.updateConceptList();

   }

  ngOnInit() {
  }

  returnToConceptList(){
    this.conceptSelected=false;
    this.selectedConceptExists = null;
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
                  this.selectedConceptFormReady = true;
                  this.selectedConceptExists = true;
              }
            );

        });
  }

  loadConceptQualias(){}8

  loadNewQualiaForm(qualia){
    console.log(qualia);
  }

  loadExistingQualiaForm(){}

  loadNewConceptForm(){
    this.conceptSelected = true;
    this.selectedConceptExists = false;
  }

  loadExistingConceptForm(){}

  deleteConcept(){}

  deleteQualia(){}



  loadNewEntanglementForm(){}

  deleteEntanglement(){}

}
