import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubCareerService } from 'src/app/shared/services/sub-career.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { subCareer } from 'src/app/shared/Models/subCareer.model';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {

 
  courseTitle:String = '';
  courseInfo = {courseLink: 'www.youtube.com/fsjfkasg', courseDuration: 30}

  constructor(private modalService: NgbModal , 
    private subCareer:SubCareerService
    ,private courses:CourseService) {
  
  }

  subcareer : subCareer[] = [];

  

  ngOnInit() {
  
  }


  getAllSubCareersByCareerID(id)
  {
   this.subCareer.getAllSubCareersByCareerID(id).subscribe(data =>{
     this.subcareer = data;
   })


  }

  openModal(content, _courseTitle) {
    this.courseTitle = _courseTitle;
    this.modalService.open(content, {centered: true, backdropClass: 'dark-modal'});
    // this.modalService.dismissAll();
  }
  

}



