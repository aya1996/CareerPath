import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService } from 'src/app/shared/services/exam.service';
import { UserService } from '../../../shared/services/user.service';
import { SubCareerService } from '../../../shared/services/sub-career.service';
import { CourseService } from '../../../shared/services/course.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  showSpinner = true;
  completed = 0;
  remain = 0;

//   "colours": [{
//     fillColor: 'rgba(47, 132, 71, 0.8)',
//     strokeColor: 'rgba(47, 132, 71, 0.8)',
//     highlightFill: 'rgba(47, 132, 71, 0.8)',
//     highlightStroke: 'rgba(47, 132, 71, 0.8)'
// }];

  public doughnutChartLabels: Label[] = ['Completed', 'UnCompleted'];
  public doughnutChartData: SingleDataSet = [30, 4];
  public doughnutChartType: ChartType = 'doughnut';

  courseTitle:String = '';
  courseInfo = {courseLink: 'www.youtube.com/fsjfkasg', courseDuration: 30}
  constructor(private modalService: NgbModal,
    private userService: UserService,
    private courseService: CourseService,
    private subCareerService: SubCareerService,
    private examService: ExamService) { }


  course: ICourse[] = [];
  coursesExam: IUserExam[] = []

  countOfCourses = 0;
  completedCourses = 0;
  finishedd = false;

  getUserProfile(){
    this.userService.getUserById(localStorage.getItem("userId")).subscribe(res => {
      // console.log(res)
      this.examService.getExamByUsername(res.userName).subscribe(e => {
        for(let i=0; i< e.length; i++){

          this.coursesExam.push({
            courseId:e[i].courseID,
            userGrade:e[i].userGrade,
            courseName:e[i].courseName
          });  //get user's exams
        }
      })
      
      //console.log(this.coursesExam);
      let courses = [];
      this.courseService.getSubCareerCourses().subscribe(sc => {
        for (let i = 0; i < sc.length; i++) {
          if(sc[i].subCareerId == res.subCareerId){
            courses.push(sc[i].courseId); //get user's courses from his subcareer .. get only ID
          }
        }
        //console.log(this.course);
        this.courseService.getCourse().subscribe(c => {
          // for(let i=0; i<c.length; i++){
          //   for(let j=0; j<courses.length; j++){
          //     if(res.userLevel == "Beginner"){
          //       if(courses[j] == c[i].courseId){
          //         this.course.push({
          //         title:c[i].courseName,
          //         courseId:c[i].courseId,
          //         progress:'untaken'
          //       });
          //       }
                
          //     }
          //     else if(res.userLevel=="Intermediate"){

          //     }
          //     if(courses[j] == c[i].courseId && c[i].level==res.userLevel){
          //       this.course.push({
          //         title:c[i].courseName,
          //         courseId:c[i].courseId,
          //         progress:'untaken'
          //       });
          //     }
          //   }
          // }
      
          // for(let k=0; k<this.coursesExam.length; k++){
          //   for(let m=0; m<this.course.length; m++){
          //     if((this.coursesExam[k].courseId == this.course[m].courseId) && (this.coursesExam[k].userGrade >= 70 )){
          //       this.course[m].progress = 'pass';
          //     }
          //      else if(this.coursesExam[k].courseId == this.course[m].courseId && this.coursesExam[k].userGrade < 70){
          //       this.course[m].progress = 'fail';
          //     } 
          //   }
          // }

          // this.countOfCourses = this.course.length;
          // for(let i=0; i<this.course.length; i++){
          //   if(this.course[i].progress == 'pass')
          //     this.completedCourses++;
          // }

          // let progrez = []
          // for (let p = 0; p < this.course.length; p++) {
          //   progrez.push(this.course[p].progress);
          // }
          // if((progrez.includes('untaken') )&& !(progrez.includes('fail'))){
          //   for(let u=0; u<this.course.length; u++){
          //     if(this.course[u].progress == 'untaken'){
          //       this.course[u].progress = 'fail'
          //       break;
          //     }
          //   }
          // }
          // if(!(progrez.includes('untaken') )&& !(progrez.includes('fail'))){
          //   this.finishedd=true;
          // }
          
        })
      })
      this.showSpinner = false;
    })
  }

  ngOnInit() {
    this.getUserProfile();
    let count = parseInt(localStorage.getItem("countOfCourses"));
    let finished = parseInt(localStorage.getItem("completedCourses"))

    this.completed = finished;
    this.remain = count - finished;

    //this.doughnutChartData = [this.completed, this.remain]

    this.showSpinner = false;
  }

}
interface ICourse {
  title: string,
  progress?: string,
  courseId: number,
}
interface IUserExam{
  courseId: number, 
  userGrade:number,
  courseName: string
}