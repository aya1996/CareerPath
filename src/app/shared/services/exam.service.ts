import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateExam } from '../Models/questionExam.model';
import { A } from '../Models/answers.model';
import { object } from '@amcharts/amcharts4/core';


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private _http:HttpClient) { }

  createExam({UserID, CourseName}){
    return this._http.post<CreateExam[]>("http://localhost:4000/api/questionExam/createExam",{UserID, CourseName});
  }

  correctExam(data: A){
    return this._http.post("http://localhost:4000/api/questionexam/answerExam",data);
  }

  getExams(){
    return this._http.get<object[]>("http://localhost:4000/api/exam");
  }
}
