import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseLinksService {

  constructor(private _http:HttpClient) { }

  apiUrl = "http://localhost:4000/api/coursepath";

  postCourseLinks(data:courseLink){
    return this._http.post(this.apiUrl, data);
  }

}

export class courseLink {
  path:string;
  payment: string;
  courseId: number;
}