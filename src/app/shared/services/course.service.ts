import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { course, SubCareerCourses } from '../Models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _http:HttpClient) { }

  apiUrl = "http://localhost:4000/api/courses";
  apiSubCareerCourses = "http://localhost:4000/api/subcareercourses";


  getCourse(){
    return this._http.get<course[]>(this.apiUrl);
  }
  getSubCareerCourses(){
    return this._http.get(this.apiSubCareerCourses);
  }

  postCourse(data:course){
    return this._http.post<course>(this.apiUrl,data);
  }
  postSubCareerCourses(data:SubCareerCourses){
    return this._http.post(this.apiSubCareerCourses,data);
  }
}
