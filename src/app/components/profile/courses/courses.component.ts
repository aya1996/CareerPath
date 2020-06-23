import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService } from 'src/app/shared/services/exam.service';
import { UserService } from '../../../shared/services/user.service';
import { SubCareerService } from '../../../shared/services/sub-career.service';
import { CourseService } from '../../../shared/services/course.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courseTitle:String = '';
  courseInfo = {courseLink: 'www.youtube.com/fsjfkasg', courseDuration: 30}
  constructor(private modalService: NgbModal,
    private userService: UserService,
    private courseService: CourseService,
    private subCareerService: SubCareerService,
    private examService: ExamService) { }

    
  showSpinner = true;
  course: ICourse[] = [];
  coursesExam: IUserExam[] = []

  countOfCourses = 0;
  completedCourses = 0;
  finishedd = false;

  getUserProfile(){
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
 
              if(courses[j] == c[i].courseId && c[i].level==res.userData.userLevel){
                this.course.push({
                  title:c[i].courseName,
                  courseId:c[i].courseId,
                  progress:'untaken'
                });
              }
            }
          }
      
          for(let k=0; k<this.coursesExam.length; k++){
            for(let m=0; m<this.course.length; m++){
              if((this.coursesExam[k].courseId == this.course[m].courseId) && (this.coursesExam[k].userGrade >= 70 )){
                this.course[m].progress = 'pass';
              }
               else if(this.coursesExam[k].courseId == this.course[m].courseId && this.coursesExam[k].userGrade < 70){
                this.course[m].progress = 'fail';
              } 
            }
          }

          this.countOfCourses = this.course.length;
          for(let i=0; i<this.course.length; i++){
            if(this.course[i].progress == 'pass')
              this.completedCourses++;
          }

          let progrez = []
          for (let p = 0; p < this.course.length; p++) {
            progrez.push(this.course[p].progress);
          }
          if((progrez.includes('untaken') )&& !(progrez.includes('fail'))){
            for(let u=0; u<this.course.length; u++){
              if(this.course[u].progress == 'untaken'){
                this.course[u].progress = 'fail'
                break;
              }
            }
          }
          if(!(progrez.includes('untaken') )&& !(progrez.includes('fail'))){
            this.finishedd=true;
          }
          
        })
      })
      this.showSpinner = false;
    })
  }

  ngOnInit() {
    this.getUserProfile();
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