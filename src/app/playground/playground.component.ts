import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable, BehaviorSubject, Subject} from 'rxjs';
import {Qualia} from '../models/qualia.model';
import {ConceptForm} from '../models/concept-form.model';
import {DataService} from '../services/data.service';
import {Entanglement} from '../models/entanglement.model';

@Component({
  selector: 'playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  field: FormControl;
  qualiaField: Qualia;
  showEntanglement:boolean = false;
  entanglementField: Entanglement;
  form = {
    field1: new FormControl('',[Validators.required,Validators.minLength(3)]),
    field2: new FormControl('',[Validators.required,Validators.minLength(3)]),
    validForm: new BehaviorSubject<boolean>(false),
    validForm$: undefined
  };
  conceptForm: ConceptForm;

  constructor(private dataService: DataService) {



    this.dataService.getTestConceptForm()
      .subscribe(
        (data)=>{
          this.conceptForm = new ConceptForm('Concept',data);
          this.entanglementField = new Entanglement(data.entanglements[0]);
        }
      );

    this.form.validForm$ = this.form.validForm.asObservable();
    this.form.validForm$.subscribe(
        data=>console.log(`ValidForm Value: ${data}`)
      )
    this.form.field1.valueChanges
      .subscribe(
        (data)=>{
          console.log(data);
          console.log(`Status: ${this.form.field1.status}`);
          this.form.validForm.next(this.validCheck());
          console.log(`BehaviorSubject: ${this.form.validForm.value}`)
        }
      );
      this.form.field2.valueChanges
        .subscribe(
          (data)=>{
            console.log(data);
            console.log(`Status: ${this.form.field1.status}`);
            this.form.validForm.next(this.validCheck());
          }
        );
  }

  ngOnInit() {
  }

  validCheck():boolean{
    var validArr = [false, false];
    validArr[0] = (this.form.field1.status==='VALID');
    validArr[1] = (this.form.field2.status==='VALID');
    var formValid = true;
    for(var i in validArr){
      if(validArr[i]===false){
        console.log("Form Not Valid");
        formValid = false;
      }
    }
    return formValid;
  }

}
