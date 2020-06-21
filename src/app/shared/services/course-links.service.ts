import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseLinksService {

  constructor(private _http:HttpClient) { }

  apiUrl = "http://localhost:4000/api/coursepath";

}

export interface courseLink {
  paths:string,
  payment: number,
  courseId: number
}