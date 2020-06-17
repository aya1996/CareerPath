import { Component, OnInit } from '@angular/core';
import { questionService } from '../../../../shared/services/question.service';
import { question } from '../../../../shared/Models/question.model';
import { CourseService } from '../../../../shared/services/course.service';
import { course } from '../../../../shared/Models/course.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  
  constructor(private questionService:questionService, 
    private CourseService:CourseService,
    private _snackBar: MatSnackBar,
    private router:Router) { }
    courses:course[] = [];

    selectedItem=0;
    selectedChoice = '';

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

  getChoice(data){
    this.selectedChoice = data.viewModel;
    // console.log(data.viewModel);
  }

  saveData(data){
    const q = new question;
    q.questName=data.title;
    q.grade=data.grade;
    q.a =data.ch1;
    q.b=data.ch2;
    q.c=data.ch3;
    q.rightAns=this.selectedChoice;
    q.courseIdRef = this.selectedItem;
    console.log(q);
    this.questionService.postQuestion(q)
    .subscribe(res => {
      this.router.navigateByUrl('/admin/index', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/question']);
      });
    });
  }

}
