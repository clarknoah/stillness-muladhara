import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import {Utils } from "../utils";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {testData } from "./testData";
import 'rxjs/Rx';
import {DOCUMENT} from '@angular/platform-browser';
var utils = new Utils();
var temp_root = "";

console.log(window.location.hostname);
if(window.location.hostname==="localhost"){
  temp_root = "http://localhost:3000/";
}else if(window.location.hostname === "104.196.54.169"){
  temp_root = "http://104.196.54.169/";
}

const ROOT_API = temp_root;


@Injectable()
export class DataService {

  conceptList: any;
  constructor(private http: Http) {
    this.getConceptList('Concept','display_name')
    .subscribe((res:Response)=>{
      this.conceptList = utils.addKeyGuid(res.json(),'key');
      console.log(this.conceptList);
      return this.conceptList;
      //  this.perceptions = res.json();
    });
  }

  submitPayloadToServer(payload):any{

    return this.http.post(ROOT_API+'submitFormPayload',payload);
  }

  updateCentralDogma():any{
    return this.http.get(ROOT_API+'updateCentralDogma');
  }

  getCentralDogmaConceptQualias(payload):any{
    return this.http.post(ROOT_API+'getCentralDogmaConceptQualias',payload);
  }

  getNewConceptForm(label):any{
      var payload = {
        conceptLabel:label
      };
      console.log(payload);
      return this.http.post(ROOT_API+'getNewConceptForm',payload)
        .do(data=>console.log(data.json()));
  }
  getExistingConceptForm(id,conceptLabel):any{
      var payload = {
        id:id,
        conceptLabel:conceptLabel
      };
      console.log(payload);
      return this.http.post(ROOT_API+'getExistingConceptForm',payload)
        .map(data=>data.json());
  }

  getConceptList(conceptLabel, qualiaFieldName){
    var query = {
      concept_label:conceptLabel,
      qualia_field_name:qualiaFieldName
    };
    return this.http.post(ROOT_API+'getConceptList',query);

  }
  getTestConceptForm():any{

    return new BehaviorSubject<any>(testData).asObservable();
  }

  login(user, pass){
    var payload = {
      username:user,
      password:pass
    };
    return this.http.post(ROOT_API+'login',payload)
      .map(data=>data.json());
  }

  logout(){
    return this.http.get(ROOT_API+'logout')
      .map(data=>data.json());
  }


  isLoggedIn(){}


}
