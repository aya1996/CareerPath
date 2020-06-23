import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { subCareer } from '../Models/subCareer.model';
import { CoursesWithSubCareers } from '../Models/CoursesWithSubCareers';

@Injectable({
  providedIn: 'root'
})
export class SubCareerService {

  constructor(private _http:HttpClient) { }

  apiUrl = "http://localhost:4000/api/subcareers";
  Url = "http://localhost:4000/api/subcareercourses";
  
  getSubCareer(){
    return this._http.get<subCareer[]>(this.apiUrl);
  }
  getSubCareerById(id){
    return this._http.get<subCareer>(`${this.apiUrl}/${id}`);
  }

  postSubCareer(data:subCareer){
    return this._http.post(this.apiUrl,data);
  }

  deleteSubCareer(id){
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  editSubCareer(id, data:subCareer){
    return this._http.put(`${this.apiUrl}/${id}`,data);
  }
  getAllSubCareersByCareerID(id){
    return this._http.get<subCareer[]>(`${this.apiUrl}/getByCareerID/${id}`);
  }

  GetAllCoursesWithSubCareers(){
    return this._http.get<CoursesWithSubCareers[]>(`${this.Url}/withSubCareer`);
  }
}
