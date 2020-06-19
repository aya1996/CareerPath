import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateExam } from '../Models/questionExam.model';


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private _http:HttpClient) { }

  createExam({UserID, CourseName}){
    return this._http.post<CreateExam[]>("http://localhost:4000/api/questionExam/createExam",{UserID, CourseName});
  }
}
