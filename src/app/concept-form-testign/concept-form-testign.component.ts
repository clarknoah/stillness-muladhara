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






}
