import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers} from '@angular/http';
import {Utils } from "../utils";
import {Observable} from "rxjs";
var utils = new Utils();

const ROOT_API = "http://localhost:3000/";

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

    this.http.post(ROOT_API+'submitFormPayload',payload)
      .subscribe((res:Response)=>{
        console.log(res);
        return res;
      });
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
        .subscribe((res:Response)=>{
        console.log(res.json());
        return new Observable(res.json());
      });
  }
  getExistingConceptForm(id):any{
      var payload = {
        id:id
      };
      console.log(payload);
      this.http.post(ROOT_API+'getExistingConceptForm',payload)
        .subscribe((res:Response)=>{
        console.log(res.json());
        return res.json();
      });
  }

  getConceptList(conceptLabel, qualiaFieldName){
    var query = {
      concept_label:conceptLabel,
      qualia_field_name:qualiaFieldName
    };
    return this.http.post(ROOT_API+'getConceptList',query);

  }
}
