import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Utils} from '../../utils';
import {Entanglement} from "../../models/entanglement.model";
var utils = new Utils();

@Component({
  selector: 'entanglement-field',
  templateUrl: './entanglement-field.component.html',
  styleUrls: ['./entanglement-field.component.css']
})
export class EntanglementFieldComponent implements OnInit {
  @Input() entanglementField: Entanglement;
  selectList: any;
  displayControl: FormControl;
  filteredSelectList: Observable<any[]>;
  selectListReady:boolean;
  preparedEntanglement:any;
  preparedLoadVariables:any;
  keyDownValue:any;
  getListLabel(){
    if(this.entanglementField.creator==='source'){
      return this.entanglementField.target_label;
    }else if(this.entanglementField.creator==='target'){
      return this.entanglementField.source_label;
    }
  }


  constructor(private dataService: DataService,
  private el:ElementRef) {

  }


  ngOnInit(){
    this.displayControl = new FormControl(this.entanglementField.current_display);
    console.log(this.entanglementField)
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
      this.filteredSelectList = this.displayControl.valueChanges
        .pipe(
          startWith(''),
          map(val =>{
            console.log(`Variable is: ${typeof(val)}: ${val}`);
            return utils.filterStringOnElementObjectKey(val, this.selectList, 'display_name');
          })
        );
      this.filteredSelectList
        .subscribe(
          (data)=>this.keyDownValue = data[0]
        );
    }

    getSelected(concept){

      console.log(concept);
      this.entanglementField.updated_value.setValue(concept.id.low);
      console.log(`Current Selected Field: ${this.entanglementField.updated_value.value}`)

    }




}
