import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  items = [1, 2, 3, 4];
  
  courseName:String = 'Typescript';
  testDuration:Number = 15;
  testDate:String = '15/5/2020';
  grade:Number = 17;
  
  constructor() { }

  ngOnInit() {
  }

}
