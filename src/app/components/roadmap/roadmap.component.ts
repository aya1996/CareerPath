import { Component, OnInit, OnDestroy} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CareerService } from '../../shared/services/career.service'

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

  constructor(private modalService: NgbModal,
    private careerService: CareerService,
    private route: ActivatedRoute) {
  
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params.id)
      this.careerService.getCareerById(params.id)
      .subscribe(res => this.careerName = res.careerName);
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



