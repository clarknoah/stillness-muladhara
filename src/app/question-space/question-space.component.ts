import { Component, OnInit } from '@angular/core';
import {Observable } from 'rxjs';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import { DataService } from '../services/data.service';
import {Utils} from '../utils';

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
  selectedEntanglement: any;

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

  returnToEntanglementList(){}

  updateConceptList(){
    this.dataService.getConceptList('Concept','display_name').subscribe(
      (res)=>{
        var returnConcepts = utils.addKeyGuid(res.json(),'key');
        console.log(returnConcepts);
       this.concepts = returnConcepts;

      }
    )
  }

  updateEntanglementList(){}

  loadExistingConcept(concept){
      console.log(concept);
      var conceptId = {id:concept.id.low};
      this.conceptSelected = true;
      //this.dataService.getExistingConceptForm(conceptId);
      this.dataService.getCentralDogmaConceptQualias(conceptId)
        .subscribe((data)=> {
          this.conceptQualiaList = utils.addKeyGuid(data.json(),'key');
          console.log(this.conceptQualiaList);
          this.selectedConceptExists = true;
        });
  }

  loadConceptQualias(){}

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

  loadExistingEntanglement(){}

  loadNewEntanglementForm(){}

  deleteEntanglement(){}

}
