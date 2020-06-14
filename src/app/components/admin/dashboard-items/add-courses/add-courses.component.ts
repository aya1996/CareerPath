import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../shared/services/course.service';
import { course } from '../../../../shared/Models/course.model';
@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  constructor(private courseService:CourseService) { }

  ngOnInit() {
  }
  saveData(data){
    const c = new course;
    c.CourseName = data.cou;
    c.CourseContent = data.coun;
    c.Description =data.des;
    c.Duration = data.dur;
    this.courseService.postCourse(c)
    .subscribe(res => console.log(res));
  }
  
  





 
}

