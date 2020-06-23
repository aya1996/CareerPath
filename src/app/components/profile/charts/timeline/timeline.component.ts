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
    private router:Router) { 
      // console.log(this.course);
    }

  course: ICourse[] = [];
  coursesExam: IUserExam[] = []
  showSpinner = true;

  countOfCourses = 0;
  completedCourses = 0;

  getUserProfile(){
    // let course: ICourse[] = [];

    this.userService.getUserProfile().subscribe(res => {
      // console.log(res)
      this.examService.getExamByUsername(res.userData.userName).subscribe(e => {
        for(let i=0; i< e.length; i++){
          this.coursesExam.push({
            courseId:e[i].courseID,
            userGrade:e[i].userGrade
          });  //get user's exams
        }
      })
      // console.log(this.coursesExam)
      let courses = [];
      this.courseService.getSubCareerCourses().subscribe(sc => {
        for (let i = 0; i < sc.length; i++) {
          if(sc[i].subCareerId == res.userData.subCareerId){
            courses.push(sc[i].courseId); //get user's courses from his subcareer .. get only ID
          }
        }
        console.log(this.course);
        this.courseService.getCourse().subscribe(c => {
          for(let i=0; i<c.length; i++){
            for(let j=0; j<courses.length; j++){
              //returns all courses from db and extract the courses of user by comparing .. to get Name
              //the courses from his subcareer and level
              if(courses[j] == c[i].courseId && c[i].level==res.userData.userLevel){
                this.course.push({
                  title:c[i].courseName,
                  courseId:c[i].courseId,
                  progress:'untaken'
                });
              }
             
            }
          }
          console.log(this.course)
          // console.log(this.coursesExam);
          // console.log(this.course);

          // change the status of his courses if he had taken the exam
          // to keep track with courses
          for(let k=0; k<this.coursesExam.length; k++){
            for(let m=0; m<this.course.length; m++){
              if((this.coursesExam[k].courseId == this.course[m].courseId) && (this.coursesExam[k].userGrade >= 70 )){
                this.course[m].progress = 'pass';
                // console.log(this.coursesExam[k].courseId);
                // console.log(this.course[m].courseId);
                // console.log(this.coursesExam[k].userGrade);
              }
               else if(this.coursesExam[k].courseId == this.course[m].courseId && this.coursesExam[k].userGrade < 70){
                this.course[m].progress = 'fail';
              } 
              //else {
              //   //this.course[m].progress = 'fail';
              // }
            }
          }
          console.log(this.course);
          // for(let k=0; k<this.coursesExam.length; k++){
          //   for(let m=0; m<this.course.length; m++){
          //     if(this.coursesExam[k].courseId == this.course[m].courseId && (this.coursesExam[0].userGrade >= 70 )){
          //       this.course.pop()
          //     }
          //   }
          // }
          // console.log(this.course);
          // this.course[0].progress = true;


          // console.log((this.coursesExam[0].courseId == this.course[0].courseId) && (this.coursesExam[0].userGrade >= 70 ));
          // console.log((this.coursesExam[0].courseId));
          // console.log(this.course[0].courseId);

          // for(let n=0; n<this.course.length; n++){
          //   if(this.course[n].progress==0 && (n-1 < 0))
          //     this.course[n].progress=40;
          //   if(this.course[n].progress == 0 && this.course[n-1].progress == 100){
          //     this.course[n].progress = 40;
          //     break;
          //   } 
          // }
         // console.log(this.course);
          this.countOfCourses = this.course.length;
          for(let i=0; i<this.course.length; i++){
            if(this.course[i].progress == 'pass')
              this.completedCourses++;
          }
          localStorage.setItem("completedCourses",this.completedCourses.toString());
          localStorage.setItem("countOfCourses",this.countOfCourses.toString());

          // console.log(this.course.indexOf());

        })
      })
      this.showSpinner = false;
    })
  }

  ngOnInit() {
    this.getUserProfile();
  }

  goToCourse(id){
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/course/${id}`]);
  }); 
  }

}

interface ICourse {
  title: string,
  progress?: string,
  courseId: number,
}
interface IUserExam{
  courseId: number, 
  userGrade:number
}


