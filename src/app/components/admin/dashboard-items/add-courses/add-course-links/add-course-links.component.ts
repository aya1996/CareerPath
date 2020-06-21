import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../shared/services/course.service';
import { course } from '../../../../../shared/Models/course.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course-links',
  templateUrl: './add-course-links.component.html',
  styleUrls: ['./add-course-links.component.css']
})
export class AddCourseLinksComponent implements OnInit {

  courses: course[] = [];
  selectedItem=0;

  constructor(private courseService:CourseService,
    private _snackBar: MatSnackBar,
    private router:Router) { }

  ngOnInit() {
    this.courseService.getCourse().subscribe(res => {
      for(let i=0; i<res.length; i++){
        this.courses.push(
          {
            courseName: res[i].courseName, 
            courseId: res[i].courseId
          }
        );
      }
    })
  }

  getSelected(c_id){
    this.selectedItem = c_id;
  }

  saveData(data){
    console.log(data)
  }


  openSnackBar() {
    this._snackBar.open('Added..', 'X', {
      duration: 2500,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

}
