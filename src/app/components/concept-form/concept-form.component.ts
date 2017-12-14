import { Component, OnInit, Input } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';

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
  mockConcept: any = {

    qualias:[
      {
        eq_type: "qualia",
        data_type: "string",
        current_value: "",
        default_value: "",
        updated_value: null,
        placeholder: "Concept Label",
        qualia_db_name: "concept_label",
        mandatory_field: true,
        field_order: 1,
        is_edittable: true,
        select_options:"",
        display_name:"Concept Label",
        hint: "Database Label for Concept"
      },
      {
        eq_type: "qualia",
        data_type: "number",
        current_value: null,
        default_value: null,
        updated_value: null,
        placeholder: "number",
        qualia_db_name: "number",
        mandatory_field: true,
        field_order: 2,
        is_edittable: true,
        select_options:null,
        display_name:"Number",
        hint: "Really Just a test and it doesn't matter"
        },
        {
        eq_type: "qualia",
        data_type: "string",
        current_value: "",
        default_value: null,
        updated_value: null,
        placeholder: "Description",
        qualia_db_name: "description",
        mandatory_field: true,
        field_order: 3,
        is_edittable: true,
        select_options:null,
        display_name:"Description",
        hint: "Description of what it does"
          }
    ]
  };

  constructor(private http: Http) {
    this.status = {
      formReceived: false,
      formSubmitted: false,
      formReady: false,
    };
  //  this.getConceptForm(this.conceptLabel);
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

  ngOnInit() {
  }

  submitNewConceptToServer():void{
    var newConcept = {
      key:'newConcept',
      label:'Concept',
      qualias:{}
    };
    console.log(newConcept);
    this.payload.create_concepts.push(newConcept);
    this.http.post('http://localhost:3000/mockSubmitFormPayload',this.payload)
      .subscribe((res:Response)=>{
      });
  }
}
