import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateExam } from '../Models/questionExam.model';
import { A } from '../Models/answers.model';


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private _http:HttpClient) { }

  apiUrl = "http://localhost:4000/api"

  createExam({UserID, CourseName}){
    return this._http.post<CreateExam[]>(`${this.apiUrl}/questionExam/createExam`,{UserID, CourseName});
  }

  correctExam(data: A){
    return this._http.post(`${this.apiUrl}/questionexam/answerExam`,data);
  }

  getExams(){
    return this._http.get<exam[]>(`${this.apiUrl}/exam`);
  }

  getExamByUsername(username:string){
    return this._http.get<exams[]>(`${this.apiUrl}/userexam/getExamsOfUser/${username}`);
  }
}

interface exam{
  examName: string
}
interface exams{
  examID: number,
  examName: string,
  userName: string,
  courseID: number,
  courseName: string,
  dateTime: string
}