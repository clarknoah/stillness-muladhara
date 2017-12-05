import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class ApiService {
  host_url: string;

  constructor(private http: Http) {
    this.host_url = "http://localhost:3000/";
   }

   getConceptForm(){}
   getConceptList(){}

}
