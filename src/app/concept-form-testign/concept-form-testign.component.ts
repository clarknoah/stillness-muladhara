import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import {FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-concept-form-testign',
  templateUrl: './concept-form-testign.component.html',
  styleUrls: ['./concept-form-testign.component.css']
})
export class ConceptFormTestignComponent implements OnInit {
  status:any;
  conceptForm: FormGroup;
  payload: any = {
    load_variables: [],
    create_concepts: [],
    create_entanglements:[],
    return:[]
  };

  constructor(private http: Http, fb: FormBuilder) {
    this.status = {
      formReceived: false,
      formSubmitted: false,
      formReady: false,
    };
    this.conceptForm = fb.group({
      concept_label:[''],
      description:[''],
      number:[]
    });
  }

  ngOnInit() {
  }

  getConceptForm(label):any{
      var payload = {
        concept_label:label
      };
      this.status.formReceived = true;
      this.http.post('http://localhost:3000/getConceptForm',payload)
        .subscribe((res:Response)=>{
        console.log(res.json());

          console.log("It looks like it was successful");
        })
  }

  submitNewConceptToServer():void{
     var newConcept = {
       key:newConcept,
       qualias:{
         concept_label:this.conceptForm.controls['concept_label'].value,
         description:this.conceptForm.controls['description'].value,
         number:this.conceptForm.controls['number'].value
       }
     };
  }
}
