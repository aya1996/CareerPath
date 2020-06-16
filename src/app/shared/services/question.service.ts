import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { question } from '../Models/question.model';

@Injectable({
  providedIn: 'root'
})
export class questionService {

  constructor(private _http:HttpClient) { }

  apiUrl = "http://localhost:4000/api/question";

  getQuestion(){
    return this._http.get<question[]>(this.apiUrl);
  }

  postQuestion(data:question){
    return this._http.post(this.apiUrl,data);
  }
}
