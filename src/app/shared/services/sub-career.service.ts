import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { subCareer } from '../Models/subCareer.model';

@Injectable({
  providedIn: 'root'
})
export class SubCareerService {

  constructor(private _http:HttpClient) { }

  apiUrl = "http://localhost:4000/api/subcareers";
  
  getSubCareer(){
    return this._http.get<subCareer[]>(this.apiUrl);
  }

  postSubCareer(data:subCareer){
    return this._http.post(this.apiUrl,data);
  }

  deleteSubCareer(id){
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
  // editSubCareer(id, data){
  //   return this._http.put(this.apiUrl,data);
  // }

}
