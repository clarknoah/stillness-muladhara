import { Injectable } from '@angular/core';
import { ConceptForm } from '../models/concept-form.model';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class AtmanService {

  currentAtman: BehaviorSubject<ConceptForm> = new BehaviorSubject(null);

  constructor(private dataService: DataService) { }

  getCurrentAtmanConcept(){}

  getCurrentAtman(){}

  isLoggedIn(){}

  logout(){}

  login(user,pass){
    this.dataService.login(user,pass)
      .subscribe(
        (data)=>{
          console.log(data);
          if(data.loginStatus==="success"){
            var user = data.currentAtman;
            localStorage.setItem('userObject',data.currentUser);
            this.dataService.getExistingConceptForm(user.id, user.label)
              .subscribe(
                (data)=>{
                  this.currentAtman.next(new ConceptForm(user.label, data, user.id));
                }
              );

          }
        }
      );
  }



}
