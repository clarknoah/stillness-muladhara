import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable, BehaviorSubject, Subject} from 'rxjs';
import {Qualia} from '../models/qualia.model';
import {ConceptForm} from '../models/concept-form.model';
import {DataService} from '../services/data.service';
import {Entanglement} from '../models/entanglement.model';
import { AtmanService } from '../services/atman.service';


@Component({
  selector: 'playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  conceptLabel: string = "Atman";
  displayKey: string = "display_name";
  constructor(private dataService: DataService,
  private atmanService: AtmanService) {


  }

  ngOnInit() {
  }
  login(username, password){
        this.atmanService.login(username,password);
  }
  logout(){
    this.atmanService.logout();
  }
  watchStatus(event){
    console.log(status);
  }

}
