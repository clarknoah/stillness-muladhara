import { Component, OnInit, Input } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import { FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ConceptForm } from '../../models/concept-form.model';
import { SubmissionPayload } from '../../models/submission-payload.model';
import { Utils } from '../../utils';

var utils = new Utils();
@Component({
  selector: 'concept-form',
  templateUrl: './concept-form.component.html',
  styleUrls: ['./concept-form.component.css']
})
export class ConceptFormComponent implements OnInit {
  @Input() conceptForm: ConceptForm;
  status: any;
  payload:SubmissionPayload;
  key:any;


  constructor(private http: Http, private dataService: DataService) {

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

  initializeSubmit(){
    console.log(this.conceptForm);
    this.payload = new SubmissionPayload;
    if(this.conceptForm.existingForm===true){
      var payload = this.payload
      .prepareExistingConceptFormForSubmission(this.conceptForm);
      console.log(payload);
      this.submitToServer(payload);
    }else{
      var payload1 = this.payload
        .prepareNewConceptFormForSubmission(this.conceptForm);
        console.log(payload1);

    }
    //this.submitToServer(payload);
  }

  submitToServer(payload):void{
    this.dataService.submitPayloadToServer(payload)
      .subscribe(
        (data)=>{
          console.log(data);
        }
      )
  }


}
