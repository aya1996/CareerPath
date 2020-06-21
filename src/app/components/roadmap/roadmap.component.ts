import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CareerService } from '../../shared/services/career.service'
import { SubCareerService } from 'src/app/shared/services/sub-career.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { subCareer } from 'src/app/shared/Models/subCareer.model';
import { course } from 'src/app/shared/Models/course.model';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  courseTitle:String = '';
  courseInfo = {courseLink: 'www.youtube.com/fsjfkasg', courseDuration: 30}

  careerName = "";
  CareerId;
public subcareers : subCareer[] = [];
  // public SubCareersLen : number = 0;

  // spinner : boolean = true;

  courses : course[][] ;

  
  constructor(private modalService: NgbModal,
    private careerService: CareerService,
    private subCareerService:SubCareerService,
    private courseService:CourseService,
    private route: ActivatedRoute) {
  
  }
  
  
  getAllSubCareersByCareerId(id)
  {
    this.subCareerService.getAllSubCareersByCareerID(id).subscribe(res=> {
      this.subcareers = res;
      // this.SubCareersLen = this.subcareers.length;
    })
    // console.log("length of subCareerslen "+ this.SubCareersLen);
  }

  // getAllCoursesBySubCareerID()
  // {
  //   // this.getAllSubCareersByCareerId(this.CareerId);
  //   // console.log(this.subcareers.length);
  //   // console.log("length of subCareerslen "+ this.SubCareersLen);

  //   for(let i:number =1 ; i<3 ; i++)
  //   {
  //     // console.log("hiiiiiiiiiiiiiiiiiiii" + this.subcareers[i].subCareerId);
  //     // let j:number=i;
  //     this.courseService.getCoursesBySubCareerID(i).subscribe(res=> {
  //       this.courses[i] =res;
  //     })
  //   }
  //   this.spinner=false;
  //   console.log("course name is" + this.courses[0][0].courseName);
  
  // }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.careerService.getCareerById(params['id'])
      .subscribe(res => this.careerName = res.careerName);
      this.CareerId=params['id'];
      console.log("careerID="+ this.CareerId);


      this.getAllSubCareersByCareerId(this.CareerId);
      // this.getAllCoursesBySubCareerID();

    });
  
  }




  
  openModal(content, _courseTitle) {
    this.courseTitle = _courseTitle;
    this.modalService.open(content, {centered: true, backdropClass: 'dark-modal'});
    // this.modalService.dismissAll();
  }
  

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}



