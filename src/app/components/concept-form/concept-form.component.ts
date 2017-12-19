import { Component, OnInit, Input } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import { FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'concept-form',
  templateUrl: './concept-form.component.html',
  styleUrls: ['./concept-form.component.css']
})
export class ConceptFormComponent implements OnInit {
  @Input() conceptLabel: string;
  status: any;
  payload: any = {
    load_variables: [],
    create_concepts: [],
    create_entanglements:[],
    return:[]
  };
  conceptForm: any;


  constructor(private http: Http, private dataService: DataService) {
    this.status = {
      formReceived: false,
      formSubmitted: false,
      formReady: false,
    };
   }

   ngOnInit() {
     this.getNewConceptForm(this.conceptLabel);
   }

  assignFormControls(){
    for(var i in this.conceptForm.qualias){
      this.conceptForm.qualias[i].control = new FormControl();
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

  submitNewConceptToServer():void{
    console.log
    var newConcept = {
      key:'newConcept',
      label:this.conceptLabel,
      qualias:this.prepareQualiasForSubmission()
    };
    console.log(newConcept);
    this.payload.create_concepts.push(newConcept);
    var res = this.dataService.submitPayloadToServer(this.payload);
  }
}
