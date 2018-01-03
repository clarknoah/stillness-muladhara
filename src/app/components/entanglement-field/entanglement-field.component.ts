import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Utils} from '../../utils';

var utils = new Utils();

@Component({
  selector: 'entanglement-field',
  templateUrl: './entanglement-field.component.html',
  styleUrls: ['./entanglement-field.component.css']
})
export class EntanglementFieldComponent implements OnInit {
  @Input() entanglementField: any;
  entanglementControl: FormControl;
  selectList: any;
  filteredSelectList: Observable<any[]>;
  selectListReady:boolean;
  preparedEntanglement:any;
  preparedLoadVariables:any;

  getListLabel(){
    if(this.entanglementField.creator==='source'){
      return this.entanglementField.target_concept;
    }else if(this.entanglementField.creator==='target'){
      return this.entanglementField.source_concept;
    }
  }


  constructor(private dataService: DataService) {

  }

  ngOnInit(){
    console.log(this.entanglementField);
    this.entanglementControl = new FormControl(
      '', [Validators.required]);
        console.log(this.entanglementField);
        //TODO
        this.dataService.getConceptList(this.getListLabel(),'display_name').subscribe(
          (res)=>{
            this.selectList = utils.addKeyGuid(res.json(),'key');
            console.log(this.selectList);
            this.initializeFilter();
            this.selectListReady = true;
          }
        )

    }
    initializeFilter(){
      this.filteredSelectList = this.entanglementControl.valueChanges
        .pipe(
          startWith(''),
          map(val =>{
            console.log(`Variable is: ${typeof(val)}: ${val}`);
            return utils.filterStringOnElementObjectKey(val, this.selectList, 'display_name');
          })
        );
    }
    getSelected(concept){
      console.log(concept);
      console.log(this.entanglementField);
      this.entanglementField.preparedEntanglement = {
        source_key:this.setSourceKey(concept),
        target_key:this.setTargetKey(concept),
        db_name:this.entanglementField.db_type
      };
      console.log(this.entanglementField.preparedEntanglement);
      this.entanglementField.preparedLoadVariables = {
        label:concept.label,
        id: concept.id.low,
        key:concept.key
      }


    }

    setSourceKey(concept){
      if(this.entanglementField.creator === 'source'){
        return this.entanglementField.concept_key;
      }else{
        return concept.key;
      }
    }
    setTargetKey(concept){
      if(this.entanglementField.creator === 'target'){
        return this.entanglementField.concept_key;
      }else{
        return concept.key;
      }
    }


}