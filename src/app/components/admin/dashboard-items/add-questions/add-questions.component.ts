import { Component, OnInit } from '@angular/core';
import { questionService } from '../../../../shared/services/question.service';
import { question } from '../../../../shared/Models/question.model';
import { CourseService } from '../../../../shared/services/course.service';
import { course } from '../../../../shared/Models/course.model';
import { MatSnackBar } from '@angular/material';

// interface Course {
//   value: string;
//   viewValue: string;
// }

// interface CourseGroup {
//   name: string;
//   course: Course[];
// }

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  // courseGroups: CourseGroup[] = [
  //   {
  //     name: 'Frontend',
  //     course: [
  //       {value: 'id1', viewValue: 'HTML'},
  //       {value: 'id2', viewValue: 'CSS'},
  //       {value: 'id3', viewValue: 'Javascript'},
  //       {value: 'id4', viewValue: 'JQuery'},
  //       {value: 'id5', viewValue: 'Angular'},
  //     ]
  //   },
  //   {
  //     name: 'Backend',
  //     course: [
  //       {value: 'id1', viewValue: 'C#'},
  //       {value: 'id2', viewValue: 'ASP.Net'},
  //       {value: 'id3', viewValue: 'MVC'},
  //       {value: 'id4', viewValue: 'EF'},
  //       {value: 'id5', viewValue: 'SQL Server'},
  //     ]
  //   },
  // ];
  constructor(private questionService:questionService, 
    private CourseService:CourseService,private _snackBar: MatSnackBar) { }
    courses:course[] = [];

    selectedItem=0;
  ngOnInit() {
    this.CourseService.getCourse()
    .subscribe(res => {
      this.courses = res;
    });
  }
  getSelected(c_id){
    this.selectedItem = c_id;
  }
  openSnackBar() {
    this._snackBar.open('Added..', 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

  saveData(data){
    const q = new question;
    q.questName=data.title;
    q.grade=data.grade;
    q.a =data.ch1;
    q.b=data.ch2;
    q.c=data.ch3;
    q.rightAns=data.right;
    q.courseIdRef = this.selectedItem;
    console.log(q);
    this.questionService.postQuestion(q)
    .subscribe(res => console.log(res));
  }

}
