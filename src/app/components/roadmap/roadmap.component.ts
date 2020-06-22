import { Component, OnInit, OnDestroy} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CareerService } from '../../shared/services/career.service';
import { SubCareerService } from '../../shared/services/sub-career.service';
import { CourseService } from '../../shared/services/course.service';
import { subCareer } from '../../shared/Models/subCareer.model';
import { course } from '../../shared/Models/course.model';

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
  subCareers :subCareer[] = [];
  showSpinner = true;
  hash = "#";

  constructor(private modalService: NgbModal,
    private careerService: CareerService,
    private subCareerService: SubCareerService,
    private route: ActivatedRoute,
    private router:Router) {
  
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params.id)
      this.careerService.getCareerById(params.id)
      .subscribe(res => {
        this.careerName = res.careerName;
        // this.subCareerService.getSubCareer().subscribe(s => {
        //   for(let i=0; i<s.length; i++){
        //     if(s[i].careerIdRef == res.careerId){
        //       this.subCareers.push({
        //         subCareerId:s[i].subCareerId,
        //         subCareerName:s[i].subCareerName
        //       });
        //     }
        //   }
        //   console.log(this.subCareers);
        // })
      });
      this.showSpinner = false;
    });
    
  }

  // getSubcareerId(id){
  //   this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([`/career/${id}`]);
  // }); 
  // }

  openModal(content, _courseTitle) {
    this.courseTitle = _courseTitle;
    this.modalService.open(content, {centered: true, backdropClass: 'dark-modal'});
    // this.modalService.dismissAll();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}



