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

  constructor(private dataService: DataService) {

    dataService.getConceptList('Concept','label_name').subscribe(
      (res)=>{
        this.selectList = utils.addKeyGuid(res.json(),'key');
        console.log(this.selectList);
        this.selectListReady = true;
      }
    )

  }

  ngOnInit(){
    console.log(this.entanglementField);
    this.entanglementControl = new FormControl(
      '', [Validators.required]);
      this.filteredSelectList = this.entanglementControl.valueChanges
        .pipe(
          startWith(''),
          map(val =>{
            console.log(`Variable is: ${typeof(val)}: ${val}`);
            return utils.filterStringOnElementObjectKey(val, this.selectList, 'label_name');
          })
        );
    }

    getSelected(concept){
      console.log(concept);
      console.log(this.entanglementField);
      this.preparedEntanglement = {
        source_key:'a',
        target_key:'a',
        db_name:this.entanglementField.db_type
      };

    }

}
