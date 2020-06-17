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

  getCareerById(id){
    return this._http.get<career>(`${this.apiUrl}/${id}`)
  }

  postCareer(data:career){
    return this._http.post(this.apiUrl,data);
  }

  updateCareer(id, data:career){
    return this._http.put(`${this.apiUrl}/${id}`,data);
  }

  deleteCareer(id){
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
