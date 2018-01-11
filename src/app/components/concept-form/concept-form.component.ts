import { Component, OnInit, Input } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import { FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ConceptForm } from '../../models/concept-form.model';
import {Utils} from '../../utils';

var utils = new Utils();
@Component({
  selector: 'concept-form',
  templateUrl: './concept-form.component.html',
  styleUrls: ['./concept-form.component.css']
})
export class ConceptFormComponent implements OnInit {
  @Input() conceptForm: ConceptForm;
  status: any;
  payload: any = {
    load_variables: [],
    create_concepts: [],
    create_entanglements:[],
    return:[]
  };
  key:any;

  constructor(private http: Http, private dataService: DataService) {
    this.status = {
      formReceived: false,
      formSubmitted: false,
      formReady: false,
    };
   }

   ngOnInit() {

   }



  prepareQualiasForSubmission():any{
    var qualias = {};
    for(var index in this.conceptForm.qualias){
      var qualiaKey = this.conceptForm.qualias[index].db_key;
      var qualiaValue = this.conceptForm.qualias[index].updated_value.value;
      qualias[qualiaKey] = qualiaValue;
    }
    console.log(qualias);
    return qualias;
  }

  prepareEntanglementsForSubmission():any{
    for(var index in this.conceptForm.entanglements){
      var ent = this.conceptForm.entanglements[index];
    //  this.payload.load_variables.push(ent.preparedLoadVariables);
    //  this.payload.create_entanglements.push(ent.preparedEntanglement);
    }
  }

  submitNewConceptToServer():void{
    var newConcept = {
      key:this.conceptForm.db_variable,
      label:this.conceptForm.db_label,
      qualias:this.prepareQualiasForSubmission()
    };
    console.log(newConcept);
    this.payload.create_concepts.push(newConcept);
    this.prepareEntanglementsForSubmission();
    console.log(this.payload);
    var res = this.dataService.submitPayloadToServer(this.payload);
  }
}
