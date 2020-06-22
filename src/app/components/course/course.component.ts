import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from '../../shared/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute,
    private courseService: CourseService) { }

  courseName: string;
  courseId: number;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.courseService.getById(params.id).subscribe(res => {
        console.log(res);
        this.courseName = res.courseName;
        this.courseId = res.courseId;
      })
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
