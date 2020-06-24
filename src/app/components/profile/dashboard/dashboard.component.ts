import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { SubCareerService } from '../../../shared/services/sub-career.service';
import { CourseService } from '../../../shared/services/course.service';
import { ExamService } from '../../../shared/services/exam.service';
import { user } from '../../../shared/Models/user.model';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  completed = 0;
  remain = 0;
  public doughnutChartLabels: Label[] = ['Completed', 'UnCompleted'];
  public doughnutChartData: SingleDataSet = [this.completed, this.remain];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private userService: UserService,
    private courseService: CourseService,
    private subCareerService: SubCareerService,
    private examService: ExamService,
    private router:Router,private modalService: NgbModal) { }

  chart;
  remainGlass = 0;
  completedGlass = 0;

  // ngAfterViewInit(): void {
   
  //   let iconPath = "M421.976,136.204h-23.409l-0.012,0.008c-0.19-20.728-1.405-41.457-3.643-61.704l-1.476-13.352H5.159L3.682,74.507 C1.239,96.601,0,119.273,0,141.895c0,65.221,7.788,126.69,22.52,177.761c7.67,26.588,17.259,50.661,28.5,71.548  c11.793,21.915,25.534,40.556,40.839,55.406l4.364,4.234h206.148l4.364-4.234c15.306-14.85,29.046-33.491,40.839-55.406  c11.241-20.888,20.829-44.96,28.5-71.548c0.325-1.127,0.643-2.266,0.961-3.404h44.94c49.639,0,90.024-40.385,90.024-90.024  C512,176.588,471.615,136.204,421.976,136.204z M421.976,256.252h-32c3.061-19.239,5.329-39.333,6.766-60.048h25.234  c16.582,0,30.024,13.442,30.024,30.024C452,242.81,438.558,256.252,421.976,256.252z"

  //   this.chart = am4core.create("chartdiv", am4charts.SlicedChart);
  //   this.chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
  //   this.chart.paddingLeft = 150;

  //   this.chart.data = [
  //     {
  //       name: "Undone",
  //       value: 40,
  //       // value: this.remain,
  //       disabled: true,
  //     },
  //     {
  //       name: "Progress",
  //       // value: this.completed,
  //       value: 60,
  //     },
  //   ];

  //   let series = this.chart.series.push(new am4charts.PictorialStackedSeries());
  //   series.dataFields.value = "value";
  //   series.dataFields.category = "name";
  //   series.alignLabels = true;
  //   // this makes only A label to be visible
  //   series.labels.template.propertyFields.disabled = "disabled";
  //   series.ticks.template.propertyFields.disabled = "disabled";

  //   series.maskSprite.path = iconPath;
  //   series.ticks.template.locationX = 1;
  //   series.ticks.template.locationY = 0;

  //   series.labelsContainer.width = 100;


  //   // chart.legend = new am4charts.Legend();
  //   // chart.legend.position = "top";
  //   // chart.legend.paddingRight = 160;
  //   // chart.legend.paddingBottom = 40;
  //   // let marker = chart.legend.markers.template.children.getIndex(0);
  //   // chart.legend.markers.template.width = 40;
  //   // chart.legend.markers.template.height = 40;
  //   // marker.cornerRadius(20, 20, 20, 20);
  // }

  showSpinner = true;
  course: ICourse[] = [];
  coursesExam: IUserExam[] = []

  countOfCourses = 0;
  completedCourses = 0;
  finishedd = false;
  userCurrentLevel = '';

  getUserProfile(){
    this.userService.getUserProfile().subscribe(res => {
      //console.log(res)
      this.userCurrentLevel = res.userData.userLevel;
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
       // console.log(this.course);
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
          
          this.completed = this.completedCourses;
          this.remain = this.countOfCourses - this.completed;

          this.doughnutChartData = [this.completed, this.remain]

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

  openModal(content){
    if(this.userCurrentLevel=='Beginner'){
      this.userService.editUserLevel({UserID:localStorage.getItem("userId"),UserLevel:"Intermediate"}).subscribe(res =>{
        this.userCurrentLevel = "Intermediate";
        console.log(res);
      });
    }
    else if(this.userCurrentLevel=='Intermediate'){
      this.userService.editUserLevel({UserID:localStorage.getItem("userId"),UserLevel:"Advanced"}).subscribe(res =>{
        this.userCurrentLevel = "Advanced";
        console.log(res);
      });
    }
    else if(this.userCurrentLevel=='Advanced'){
      alert('Congratulations');
      return;
    }

    // console.log(this.userCurrentLevel);
    this.modalService.open(content);
  }
  goToNextLevel(){
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/profile"]);
  }); 
  this.modalService.dismissAll();
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
