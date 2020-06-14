import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { course } from '../Models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _http:HttpClient) { }

  apiUrl = "https://careerpathweb.azurewebsites.net/api/courses";

  getCourse(){
    return this._http.get(this.apiUrl);
  }

  postCourse(data:course){
    return this._http.post(this.apiUrl,data);
  }
}
