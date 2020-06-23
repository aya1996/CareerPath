import { Component, OnInit, OnDestroy, Output } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CareerService } from "../../shared/services/career.service";
import { SubCareerService } from "src/app/shared/services/sub-career.service";
import { CourseService } from "src/app/shared/services/course.service";
import { subCareer } from "src/app/shared/Models/subCareer.model";
import { course } from "src/app/shared/Models/course.model";
import { any } from "@amcharts/amcharts4/.internal/core/utils/Array";
import { CoursesWithSubCareers } from "src/app/shared/Models/CoursesWithSubCareers";
import { number } from "@amcharts/amcharts4/core";

@Component({
  selector: "app-roadmap",
  templateUrl: "./roadmap.component.html",
  styleUrls: ["./roadmap.component.css"],
})
export class RoadmapComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  courseTitle: String = "";
  courseInfo = { courseLink: "www.youtube.com/fsjfkasg", courseDuration: 30 };

  careerName = "";
  CareerId;

  dummy : number = 4;
  public subcareers: subCareer[] = [];

  CoursesWithSubCareers: CoursesWithSubCareers[] = [];

  spinner : boolean = true;

  constructor(
    private modalService: NgbModal,
    private careerService: CareerService,
    private subCareerService: SubCareerService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  getAllSubCareersByCareerId(id) {
    this.subCareerService.getAllSubCareersByCareerID(id).subscribe((res) => {
      this.subcareers = res;
    });
  }

  GetAllCoursesWithSubCareers() {
    this.subCareerService.GetAllCoursesWithSubCareers().subscribe((res) => {
      console.log("result is " + res[2].courseName);

      for (let i = 0; i < res.length; i++) {
        this.CoursesWithSubCareers.push({
          courseID: res[i].courseID,
          courseName: res[i].courseName,
          level: res[i].level,
          subCareerID: res[i].subCareerID,
          subCareerName: res[i].subCareerName,
          Description: res[i].Description,
        });
        console.log(this.CoursesWithSubCareers[i].level);
      }

      console.log(
        "data from coiurse with subcareers" +
         this.CoursesWithSubCareers[0].level
      );
      return  this.CoursesWithSubCareers;

      // this.CoursesWithSubCareers = res;
      

    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.careerService
        .getCareerById(params["id"])
        .subscribe((res) => (this.careerName = res.careerName));
      this.CareerId = params["id"];
      console.log("careerID=" + this.CareerId);

      this.getAllSubCareersByCareerId(this.CareerId);
      this.GetAllCoursesWithSubCareers();
      this.spinner=false;

    });
  }

  openModal(content, _courseTitle) {
    this.courseTitle = _courseTitle;
    this.modalService.open(content, {
      centered: true,
      backdropClass: "dark-modal",
    });
    // this.modalService.dismissAll();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
