import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../shared/services/exam.service';
import { UserService } from '../../../shared/services/user.service';
import { exams } from '../../../shared/services/exam.service';


@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  exam: exams[] = [];
  // hadExam = false;
  showSpinner = true;
  
  constructor(private examService:ExamService,
    private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(u => {
      this.examService.getExamByUsername(u.userData.userName).subscribe(res => {
        for(let i=0; i<res.length; i++){
          this.exam.push({
            examID:res[i].examID,
            examName: res[i].examName,
            userName: res[i].userName,
            courseName: res[i].courseName,
            courseID: res[i].courseID,
            userGrade:res[i].userGrade,
            dateTime: res[i].dateTime.slice(0,10)
          })
        }
        // this.hadExam = true;
      })
      this.showSpinner = false;
      console.log(this.exam)
    })
    
  }

}
