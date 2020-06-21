import { Component, OnInit, OnDestroy } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { SubCareerService } from 'src/app/shared/services/sub-career.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { subCareer } from 'src/app/shared/Models/subCareer.model';
=======
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CareerService } from '../../shared/services/career.service'
>>>>>>> d0ea698420be97842162fe6c8ce0d17af507514c

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  courseTitle:String = '';
  courseInfo = {courseLink: 'www.youtube.com/fsjfkasg', courseDuration: 30}

<<<<<<< HEAD
  constructor(private modalService: NgbModal , 
    private subCareer:SubCareerService
    ,private courses:CourseService) {
  
  }

  subcareer : subCareer[] = [];

=======
  careerName = "";

  constructor(private modalService: NgbModal,
    private careerService: CareerService,
    private route: ActivatedRoute) {
>>>>>>> d0ea698420be97842162fe6c8ce0d17af507514c
  
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.careerService.getCareerById(params['id'])
      .subscribe(res => this.careerName = res.careerName);
    });
  
  }

<<<<<<< HEAD

  getAllSubCareersByCareerID(id)
  {
   this.subCareer.getAllSubCareersByCareerID(id).subscribe(data =>{
     this.subcareer = data;
   })


  }

=======
  
>>>>>>> d0ea698420be97842162fe6c8ce0d17af507514c
  openModal(content, _courseTitle) {
    this.courseTitle = _courseTitle;
    this.modalService.open(content, {centered: true, backdropClass: 'dark-modal'});
    // this.modalService.dismissAll();
  }
  

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}



