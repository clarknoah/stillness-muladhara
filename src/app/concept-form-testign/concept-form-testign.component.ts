import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import {FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {DataService} from '../services/data.service';
import {ConceptForm} from '../models/concept-form.model';
@Component({
  selector: 'app-concept-form-testign',
  templateUrl: './concept-form-testign.component.html',
  styleUrls: ['./concept-form-testign.component.css']
})
export class ConceptFormTestignComponent implements OnInit {
  status:any;
  conceptForm: ConceptForm;
  constructor(private dataService: DataService) {
    this.status = {
      formReceived: false,
      formSubmitted: false,
      formReady: false,
    };

        this.dataService.getTestConceptForm()
          .subscribe(
            (data)=>{
              this.conceptForm = new ConceptForm('Concept',data);
            }
          );
  }

  ngOnInit() {
  }






}
