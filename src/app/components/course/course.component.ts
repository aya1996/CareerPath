import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../shared/services/exam.service';
import { questionService } from '../../shared/services/question.service';
import { CreateExam } from '../../shared/Models/questionExam.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private examService:ExamService, private questionService:questionService) { }

  ngOnInit() {
  }
  UserID = localStorage.getItem("userId");
  CourseName = "HTML";
  QsExam: CreateExam[] = [];

  showExam(){
    this.examService.createExam({UserID:this.UserID, CourseName:this.CourseName})
    .subscribe(res => {
      this.questionService.getQuestion().subscribe(Qs => {
        for(let i=0; i<res.length; i++){
          this.QsExam.push({
            questId : res[i].questId,
            questName: res[i].questName,
            examId: res[i].examId,
            rightAns: res[i].rightAns
          })
        }
        for(let i=0; i<Qs.length; i++){
          for(let j=0; j<this.QsExam.length; j++){
            if(this.QsExam[j].questId == Qs[i].questId){
              this.QsExam[j].a = Qs[i].a;
              this.QsExam[j].b = Qs[i].b;
              this.QsExam[j].c = Qs[i].c;
              break;
            }
          }
        }
        console.log(this.QsExam);
      })
    });
  }
}
