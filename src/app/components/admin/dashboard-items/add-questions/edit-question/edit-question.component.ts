import { Component, OnInit } from '@angular/core';
import { questionService } from '../../../../../shared/services/question.service';
import { question } from '../../../../../shared/Models/question.model';
import { CourseService } from '../../../../../shared/services/course.service';
import { course } from '../../../../../shared/Models/course.model';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  private routeSub: Subscription;
  
  constructor(private questionService:questionService, 
    private CourseService:CourseService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router) { }
    courses:course[] = [];
    qs:question ;

    selectedChoice ;
    showSpinner = true;
    qId;
    courseName = '';

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      // console.log(params) //log the entire params object
      // console.log(params['questId']) //log the value of id
      this.questionService.getQuestionById(params['questId'])
      .subscribe(res => {
        this.qs = res;
        this.qId = params['questId'];
        this.selectedChoice = this.qs.rightAns;
        this.CourseService.getById(this.qs.courseIdRef)
        .subscribe(data => {
          this.courseName = data.courseName;
          this.showSpinner = false;
        })
      })

    });

    this.CourseService.getCourse()
    .subscribe(res => {
      this.courses = res;
    });
  }

  openSnackBar() {
    this._snackBar.open('Updated..', 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

  getChoice(data){
    this.selectedChoice = data;
    console.log(data);
  }

  saveData(data){
    const q = new question;
    q.questId = this.qId;
    q.questName=data.title;
    q.grade=data.grade;
    q.a =data.ch1;
    q.b=data.ch2;
    q.c=data.ch3;
    q.rightAns=this.selectedChoice;
    q.courseIdRef = this.qs.courseIdRef;

    this.questionService.updateQuestion(q.questId,q).subscribe(res => {
      this.router.navigateByUrl('/admin/index', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/question']);
      });
    });
    
 
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}


