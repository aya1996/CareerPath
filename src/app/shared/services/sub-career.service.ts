import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { subCareer } from '../Models/subCareer.model';

@Injectable({
  providedIn: 'root'
})
export class SubCareerService {

  constructor(private _http:HttpClient) { }

  apiUrl = "https://careerpathweb.azurewebsites.net/api/career";

  getSubCareer(){
    return this._http.get(this.apiUrl);
  }

  postSubCareer(data:subCareer){
    return this._http.post(this.apiUrl,data);
  }

}
