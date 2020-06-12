import { Component, OnInit } from '@angular/core';

interface Course {
  value: string;
  viewValue: string;
}

interface CourseGroup {
  name: string;
  course: Course[];
}

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  courseGroups: CourseGroup[] = [
    {
      name: 'Frontend',
      course: [
        {value: 'id1', viewValue: 'HTML'},
        {value: 'id2', viewValue: 'CSS'},
        {value: 'id3', viewValue: 'Javascript'},
        {value: 'id4', viewValue: 'JQuery'},
        {value: 'id5', viewValue: 'Angular'},
      ]
    },
    {
      name: 'Backend',
      course: [
        {value: 'id1', viewValue: 'C#'},
        {value: 'id2', viewValue: 'ASP.Net'},
        {value: 'id3', viewValue: 'MVC'},
        {value: 'id4', viewValue: 'EF'},
        {value: 'id5', viewValue: 'SQL Server'},
      ]
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
