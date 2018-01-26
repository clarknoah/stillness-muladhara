import { Injectable } from '@angular/core';
import { ConceptForm } from '../models/concept-form.model';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { Utils } from '../utils';

const utils = Utils;

@Injectable()
export class AtmanService {

  userLoggedIn: boolean;
  currentUserName: string;
  currentAtman: BehaviorSubject<ConceptForm> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
    if(localStorage.getItem('objectUser')){
      this.userLoggedIn = true;
    }else{
      this.userLoggedIn = false;
    }
   }

  getCurrentAtmanConcept(){}

  getCurrentAtmanDbVariable(){
    if(this.userLoggedIn===true){
      var dbVar = {
        id:this.currentAtman.value.db_id,
        key:this.currentAtman.value.db_variable
      };
    return dbVar;
    }else{
      console.log("No User Logged In");
    }

  }

  getCurrentAtman(){}

  isLoggedIn():boolean {
    return this.userLoggedIn;
  }

  logout(){
    this.dataService.logout()
      .subscribe(
        (data)=>{
        this.userLoggedIn = false;
        localStorage.removeItem('userObject');
        console.log(data);
      });
  }

  login(user,pass){
    this.dataService.login(user,pass)
      .subscribe(
        (data)=>{
          console.log(data);
          if(data.loginSuccess===true){
            console.log("Successful Login!");
            var user = data.currentAtman;
            this.userLoggedIn = true;
            this.currentUserName = user.properties.username;
            localStorage.setItem('userObject',user);
            this.dataService.getExistingConceptForm(user.identity.low, user.labels[0])
              .subscribe(
                (data)=>{
                  console.log(user.identity.low);
                  var id = user.identity.low;
                  this.currentAtman.next(new ConceptForm(user.labels[0], data, id));
                }
              );

          }else{
            alert(data.message);
          }
        }
      );
  }



}
