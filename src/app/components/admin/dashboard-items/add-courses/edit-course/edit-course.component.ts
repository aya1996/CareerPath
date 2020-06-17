import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CourseService } from '../../../../../shared/services/course.service';
import { course } from '../../../../../shared/Models/course.model';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  private routeSub: Subscription;

  constructor(private courseService:CourseService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  showSpinner = true;
  courseItem: course;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
     this.courseService.getById(params['id']).subscribe(res => {
      this.courseItem = res;
      this.showSpinner = false;
     })
    });
    
  }

  saveData(data){
    const c = new course;
    c.courseName = data.cou;
    c.courseContent = data.coun;
    c.description =data.des;
    c.duration = data.dur;
    c.courseId = this.courseItem.courseId;

    this.courseService.updateCourse(c.courseId,c).subscribe(res => console.log(res));
    
  }
  openSnackBar() {
    this._snackBar.open('Updated..', 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}


