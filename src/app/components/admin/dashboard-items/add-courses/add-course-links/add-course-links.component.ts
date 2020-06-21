import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../shared/services/course.service';
import { CourseLinksService } from '../../../../../shared/services/course-links.service';
import { courseLink } from '../../../../../shared/services/course-links.service';
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
  courseCost = [
    {viewValue:'Free', value:1},
    {viewValue:'Paid', value:2}
  ]

  constructor(private courseService:CourseService,
    private _snackBar: MatSnackBar,
    private router:Router,
    private courseLinksService: CourseLinksService) { }

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
    console.log(c_id);
  }
  cCost='';
  getSelectedCost(cost){
    this.cCost = cost;
  }

  saveData(data){
    const c = new courseLink;
    c.courseId = this.selectedItem;
    c.path = data.link;
    c.payment = this.cCost;

    this.courseLinksService.postCourseLinks(c)
    .subscribe(res => console.log(res));

    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/add-course/links']);
    });
  }

  openSnackBar() {
    this._snackBar.open('Added..', 'X', {
      duration: 2500,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

}
