import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { course, SubCareerCourses } from '../Models/course.model';
import { subCareer } from '../Models/subCareer.model';

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
  getAll(){
    return this._http.get(this.apiUrl);
  }
  getById(id){
    return this._http.get<course>(`${this.apiUrl}/${id}`)
  }

  getSubCareerCourses(){
    return this._http.get<SubCareerCourses[]>(this.apiSubCareerCourses);
  }

  postCourse(data:course){
    return this._http.post<course>(this.apiUrl,data);
  }
  postSubCareerCourses(data:SubCareerCourses){
    return this._http.post(this.apiSubCareerCourses,data);
  }

  updateCourse(id, data:course){
    return this._http.put(`${this.apiUrl}/${id}`, data)
  }

  deleteCourse(id){
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
