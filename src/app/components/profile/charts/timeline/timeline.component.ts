import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { SubCareerService } from '../../../../shared/services/sub-career.service';
import { CourseService } from '../../../../shared/services/course.service';
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
    private router:Router) { }

  course: ICourse[] = [];
  showSpinner = true;
  remain = 0;
  inProgress = 40;
  completed = 100;

  ngOnInit() {
    this.userService.getUserProfile().subscribe(res => {
      console.log(res.userData.subCareerId);
      console.log(res.userData.userLevel);
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


