import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ConceptForm } from '../../models/concept-form.model';
import { Utils } from '../../utils';

const utils = new Utils;

@Component({
  selector: 'concept-list-editor',
  templateUrl: './concept-list-editor.component.html',
  styleUrls: ['./concept-list-editor.component.css']
})
export class ConceptListEditorComponent implements OnInit {
  @Input() conceptLabel: string;
  @Input() displayKey: string;
  @Output() status: EventEmitter<string> = new EventEmitter();
  conceptList: any[];
  currentView: string = "conceptList";
  conceptSelected: boolean = false;
  selectedConceptForm: ConceptForm;
  selectedConceptFormReady: boolean = false;
  selectedConceptExists: boolean = null;
  selectedListItem: any;

  constructor(private dataService: DataService) {
  }
  ngOnInit() {
    console.log(this.conceptLabel);
    this.updateConceptList();
  }

  returnToConceptList(){
    this.conceptSelected=false;
    this.selectedConceptExists = null;
    this.selectedConceptFormReady = false;
  }

  formStatus(event){
    console.log(event);
    if(event === "submissionSuccessful"){
      this.dataService.updateCentralDogma()
        .subscribe(
          (data)=>{
            console.log(data);
            this.updateConceptList();
            this.returnToConceptList();
          }
        );
    }
  }


  updateConceptList(){
    this.dataService.getConceptList(this.conceptLabel,this.displayKey).subscribe(
      (res)=>{
        var returnConcepts = utils.addKeyGuid(res.json(),'key');
        console.log(returnConcepts);
       this.conceptList = returnConcepts;

      }
    )
  }

  loadExistingConceptForm(concept){
      console.log(concept);
      this.selectedListItem= concept;
      var conceptId = {id:concept.id.low};
      this.conceptSelected = true;
          this.dataService.getExistingConceptForm(
            concept.id.low,this.conceptLabel)
            .subscribe(
              (data)=>{
                this.selectedConceptForm = new ConceptForm(
                  concept.label, data, concept.id.low);
                  this.selectedConceptFormReady = true;
                  this.selectedConceptExists = true;
              }
            );
  }

  loadNewConceptForm(){
    this.conceptSelected = true;
    this.dataService.getNewConceptForm(this.conceptLabel)
      .subscribe(
        (data)=>{
          console.log(data.json());
          this.selectedConceptForm = new ConceptForm(
            this.conceptLabel, data.json());
            this.selectedConceptExists = false;
            this.selectedConceptFormReady = true;
        }
      );


  }

}
