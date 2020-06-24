import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from '../../../shared/services/course.service';
import { CourseLinksService } from '../../../shared/services/course-links.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  private routeSub: Subscription;
  careerTitle = "FrontEnd ";
  starName = "star-o";

  constructor(private modalService: NgbModal, 
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private courseLinks:CourseLinksService) { }

  courses: ICourse[] = [];
  courseName = '';
  showSpinner = true;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.courseService.getById(params.id).subscribe(res => {
        this.courseName = res.courseName;
        this.courseLinks.getCourseLinks().subscribe(c => {
          for(let i=0; i<c.length; i++){
            if(c[i].courseId==params.id){
              this.courses.push({
                courseId:params.id,
                courseLinks:c[i].path,
                coursePayment:c[i].payment
              })
            }
          }
          console.log(this.courses);
          this.showSpinner = false;
        })
      })
    });
  }

  // openModal(content, _courseTitle) {
  //   this.modalService.open(content, {centered: true});
  // }

  // changeStarState(){
  //   if(this.starName === "star")
  //   {
  //     this.starName = "star-o";
  //     this._snackBar.open('Removed from wishlist', 'X', {
  //       duration: 3000,
  //       horizontalPosition: 'right',
  //       verticalPosition: 'bottom',
  //     });
  //   }
  //   else
  //   {
  //     this.starName = "star";
  //     this._snackBar.open('Added to wishlist', 'X', {
  //       duration: 3000,
  //       horizontalPosition: 'right',
  //       verticalPosition: 'bottom',
  //     });
  //   }
  // }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}

interface ICourse{
  courseId: number,
  coursePayment: string,
  courseLinks: string
}
