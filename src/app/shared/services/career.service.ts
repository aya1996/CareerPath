import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { career } from '../Models/career.model';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private _http:HttpClient) { }

  apiUrl = "http://localhost:4000/api/career";

  getCareer(){
    return this._http.get<career[]>(this.apiUrl);
  }

  postCareer(data:career){
    return this._http.post(this.apiUrl,data);
  }
}
