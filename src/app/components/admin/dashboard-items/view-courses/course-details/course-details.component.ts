import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubCareerService } from '../../../../../shared/services/sub-career.service';
import { CourseService } from '../../../../../shared/services/course.service';
import { ExamService } from '../../../../../shared/services/exam.service';
import { CourseLinksService } from '../../../../../shared/services/course-links.service';
import { courseLink } from '../../../../../shared/Models/courseLinks.model';
import { Router } from '@angular/router';
import { course } from '../../../../../shared/Models/course.model';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  QControl = new FormControl();

  displayedColumns: string[] = ['courseName', 'path','payment'];
  dataSource: MatTableDataSource<courseLink>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //mySubscription: any;

  constructor(private courseLinkService: CourseLinksService, 
    private coursesService:CourseService,
    private modalService: NgbModal,
    private router:Router,
    private examService:ExamService,
    SubCareerService:SubCareerService) {

    // Assign the data to the data source for the table to render
 
    
  }

  coursel: courseLink[] = [];
courses:course[]
  showSpinner = true;

  ngOnInit() {
    
    this.coursesService.getCourse().subscribe(res => {

      this.courseLinkService.getCourseLinks().subscribe(cl => {
     
        for(let i=0; i<cl.length; i++){
          this.coursel[i]=cl[i]
          for(let j=0; j<res.length; j++){
            if(cl[i].courseId == res[j].courseId){
              this.coursel[i].courseName = res[j].courseName;
            }
       
            // if(res[i].courseId == cl[j].courseId){
            //   this.course.push({
            //     courseId:cl[i].courseId,
            //     path:cl[i].path,
            //     payment:cl[i].payment,
            //     courseName:res[i].courseName
            //   });
            // }
          }
        }
        console.log(this.coursel);

      })
      this.dataSource = new MatTableDataSource(this.coursel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showSpinner = false;

    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDeletedId = 0;
  coursename = ''

  openModal(content,id,cname) {
    this.getDeletedId = id;
    this.coursename = cname;
    this.modalService.open(content);
  }

  ok = 1;
  deleteCourse(){
    // this.isLoaded = false;
    this.examService.getExams().subscribe(e => {
      for(let i=0; i<e.length; i++){
        // to get the first word of the examName which is the same name of the course
        const x = e[i].examName.split(" ")[0].toLowerCase()
        if(this.coursename.toLowerCase() == x){
          this.ok = 0;
          alert("Sorry you can't delete this course. It's assigned to user...")
          break;
        }
      }
      if(this.ok == 1){
        this.coursesService.deleteCourse(this.getDeletedId).subscribe(res => { console.log(res)});
      }
    })

    this.modalService.dismissAll();
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['admin/course']);
    });
  }

}







