import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { courseLink } from '../Models/courseLinks.model';
@Injectable({
  providedIn: 'root'
})
export class CourseLinksService {

  constructor(private _http:HttpClient) { }

  apiUrl = "http://localhost:4000/api/coursepath";

  postCourseLinks(data:courseLink){
    return this._http.post(this.apiUrl, data);
  }

  getCourseLinks(){
    return this._http.get<courseLink[]>(this.apiUrl);
  }

}

// export class courseLink {
//   courseName?: string;
//   path:string;
//   payment: string;
//   courseId?: number;
// }