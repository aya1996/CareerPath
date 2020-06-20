import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SubCareerService } from '../../../../shared/services/sub-career.service';
import { CourseService } from '../../../../shared/services/course.service';
import { subCareer } from '../../../../shared/Models/subCareer.model';
import { course } from '../../../../shared/Models/course.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  constructor(private courseService:CourseService, 
    private _snackBar: MatSnackBar,
    private subCareerService:SubCareerService,
    private router:Router) { }

  subCareer: subCareer[] = [];
  selectedItem=0;
  
  ngOnInit() {
    this.subCareerService.getSubCareer()
    .subscribe( res => {
      for (const key in res) {
        this.subCareer.push({
          subCareerId: res[key].subCareerId, 
          subCareerName:res[key].subCareerName, 
          careerIdRef:res[key].careerIdRef});
      }
      //console.log(this.subCareer)
    });
  }

  getSelected(c_id){
    this.selectedItem = c_id;
  }


  saveData(data){
    const c = new course;
    c.courseName = data.cou;
    c.courseContent = data.coun;
    c.description =data.des;
    c.duration = data.dur;

    this.courseService.postCourse(c)
    .subscribe(courseObj => {
      this.courseService.postSubCareerCourses({SubCareerId:this.selectedItem,CourseId: courseObj.courseId})
      .subscribe(res => console.log(res));
    });

    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/course']);
    });
    
  }
  openSnackBar() {
    this._snackBar.open('Added..', 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

 
}

