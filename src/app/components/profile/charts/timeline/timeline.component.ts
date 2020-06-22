import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { SubCareerService } from '../../../../shared/services/sub-career.service';
import { CourseService } from '../../../../shared/services/course.service';
import { ExamService } from '../../../../shared/services/exam.service';
import { user } from '../../../../shared/Models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  data = [
    {
      course:'html',
      remain:100
    },
    {
      course:'css',
      remain:40
    },
    {
      course:'js',
      remain:0
    },
    {
      course:'jquery',
      remain:0
    },
    {
      course:'bootstrap',
      remain:0
    },
    {
      course:'html',
      remain:0
    },
    {
      course:'html',
      remain:0
    },
    {
      course:'html',
      remain:0
    }
  ]
  constructor(private userService: UserService,
    private courseService: CourseService,
    private subCareerService: SubCareerService,
    private examService: ExamService,
    private router:Router) { }

  course: ICourse[] = [];
  showSpinner = true;
  remain = 0;
  inProgress = 40;
  completed = 100;

  ngOnInit() {
    this.userService.getUserProfile().subscribe(res => {
      let coursesExam = [];
      this.examService.getExamByUsername(res.userData.userName).subscribe(e => {
        for(let i=0; i< e.length; i++){
          coursesExam.push(e[i].courseID);
        }
      })
      let courses = [];
      this.courseService.getSubCareerCourses().subscribe(sc => {
        for (let i = 0; i < sc.length; i++) {
          if(sc[i].subCareerId == res.userData.subCareerId){
            courses.push(sc[i].courseId);
          }
        }
        this.courseService.getCourse().subscribe(c => {
          for(let i=0; i<c.length; i++){
            for(let j=0; j<courses.length; j++){
              if(courses[j] == c[i].courseId && c[i].level==res.userData.userLevel){
                this.course.push({
                  title:c[i].courseName,
                  progress: 40,
                  courseId:c[i].courseId
                });
              }
            }
          }
          for(let k=0; k<coursesExam.length; k++){
            for(let m=0; m<this.course.length; m++){
              if(coursesExam[k] == this.course[m].courseId){
                this.course[m].progress = 100;
              } else{
                this.course[m].progress = 0;
              }
            }
          }
          for(let n=0; n<this.course.length; n++){
            if(this.course[n].progress == 0 && this.course[n-1].progress == 100){
              this.course[n].progress = 40;
              break;
            } 
          }
        })
      })
      this.showSpinner = false;
    })
  }

  goToCourse(id){
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/course/${id}`]);
  }); 
  }

}


interface ICourse {
  title: string,
  progress: number,
  courseId: number,
}


