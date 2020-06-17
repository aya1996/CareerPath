import { Component, OnInit } from '@angular/core';
import { CareerService } from '../../../shared/services/career.service';
import { SubCareerService } from '../../../shared/services/sub-career.service';
import { CourseService } from '../../../shared/services/course.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private careerService:CareerService,
    private subCareerService: SubCareerService,
    private courseService: CourseService) { }

  careers: number = 0;
  subcareers: number = 0;
  courses: number = 0;

  ngOnInit() {
    this.careerService.getCareer()
    .subscribe(res => this.careers = res.length);

    this.subCareerService.getSubCareer()
    .subscribe(res => this.subcareers = res.length);

    this.courseService.getCourse()
    .subscribe(res => this.courses = res.length)
  }

}
