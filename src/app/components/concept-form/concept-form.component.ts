import { Component, OnInit, Input } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import { FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import {Utils} from '../../utils';

var utils = new Utils();
@Component({
  selector: 'concept-form',
  templateUrl: './concept-form.component.html',
  styleUrls: ['./concept-form.component.css']
})
export class ConceptFormComponent implements OnInit {
  @Input() conceptLabel: string;
  @Input() conceptId?: number;
  status: any;
  payload: any = {
    load_variables: [],
    create_concepts: [],
    create_entanglements:[],
    return:[]
  };
  conceptForm: any;
  key:any;

  constructor(private http: Http, private dataService: DataService) {
    this.status = {
      formReceived: false,
      formSubmitted: false,
      formReady: false,
    };
   }

   ngOnInit() {
     if(this.conceptId){
       this.getExistingConceptForm()
     }else{
       this.getNewConceptForm(this.conceptLabel);
     }
   }

   assignConceptIdAndVariable(){
     this.conceptForm.key = utils.generateGuid();
     for(var i in this.conceptForm.qualias){
       this.conceptForm.qualias[i].concept_key = this.conceptForm.key;
     }
     for(var i in this.conceptForm.entanglements){
       this.conceptForm.entanglements[i].concept_key = this.conceptForm.key;
     }
   }

  assignFormControls(){
    for(var i in this.conceptForm.qualias){
      this.conceptForm.qualias[i].control = new FormControl();
    }
    for(var i in this.conceptForm.entanglements){
      this.conceptForm.entanglements[i].control = new FormControl();
    }
  }

  getNewConceptForm(label):any{
      var payload = {
        conceptLabel:label
      };
      console.log(payload);
      this.status.formReceived = true;
      this.http.post('http://localhost:3000/getNewConceptForm',payload)
        .subscribe((res:Response)=>{
        console.log(res.json());
        this.conceptForm = res.json();
        this.assignConceptIdAndVariable();
        this.assignFormControls();
        this.status.formReady = true;
        })
  }

  prepareQualiasForSubmission():any{
    var qualias = {};
    for(var index in this.conceptForm.qualias){
      var qualiaKey = this.conceptForm.qualias[index].db_key;
      var qualiaValue = this.conceptForm.qualias[index].control.value;
      qualias[qualiaKey] = qualiaValue;
    }
    console.log(qualias);
    return qualias;
  }
  prepareEntanglementsForSubmission():any{
    for(var index in this.conceptForm.entanglements){
      var ent = this.conceptForm.entanglements[index];
      this.payload.load_variables.push(ent.preparedLoadVariables);
      this.payload.create_entanglements.push(ent.preparedEntanglement);
    }
  }

  submitNewConceptToServer():void{
    var newConcept = {
      key:this.conceptForm.key,
      label:this.conceptForm.label_name,
      qualias:this.prepareQualiasForSubmission()
    };
    console.log(newConcept);
    this.payload.create_concepts.push(newConcept);
    this.prepareEntanglementsForSubmission();
    console.log(this.payload);
    var res = this.dataService.submitPayloadToServer(this.payload);
  }
}
