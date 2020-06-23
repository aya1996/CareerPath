import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubCareerService } from '../../../../shared/services/sub-career.service';
import { CourseService } from '../../../../shared/services/course.service';
import { ExamService } from '../../../../shared/services/exam.service';
import { subCareer } from '../../../../shared/Models/subCareer.model';
import { course } from '../../../../shared/Models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  QControl = new FormControl();

  displayedColumns: string[] = ['courseName', 'description', 'duration','courseLevel','edit','delete'];
  // displayedColumns: string[] = ['courseName', 'courseContent', 'description', 'duration', 'numOfUsers','edit'];
  dataSource: MatTableDataSource<course>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //mySubscription: any;

  constructor(private subCareerService:SubCareerService, 
    private coursesService:CourseService,
    private modalService: NgbModal,
    private router:Router,
    private examService:ExamService) {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.courses);
    
  }
  
  paths: subCareer[] = [];
  courses: course[] = [];
  isLoaded = false;
  selectedItem = '';

  ngOnInit() {
    
    this.subCareerService.getSubCareer().subscribe(res => {
        this.paths = res;
        this.coursesService.getCourse().subscribe(cour => {
          for(let i=0; i<cour.length; i++)
            this.courses[i] = cour[i];
    
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoaded = true;
          
        });
      }
    );

    //to get the corresponding subcareer with course
    // this.coursesService.getAll().subscribe(res => {
    //   for(let i in res){
    //     for(const j in res[i].subCareerCourses)
    //       console.log(res[i].subCareerCourses[j].subCareer.subCareerName);
    //   }
    // })
  }

  // getSelected(data){
  //   this.isLoaded = false;
  //  // this.selectedItem = data;
  //   this.courses = []
  //   this.coursesService.getSubCareerCourses().subscribe(res => {
  //     this.coursesService.getCourse().subscribe(cour => {
  //       for(let n=0; n<res.length; n++){
  //         if(res[n].SubCareerId==data){
  //           for(let i=0; i<cour.length; i++){
  //             console.log(cour)
  //             if(res[n].CourseId == cour[i].courseId){
  //               console.log(cour)
  //               this.courses.push(
  //                 {courseContent:cour[i].courseContent,
  //                   courseId:cour[i].courseId,
  //                   courseName:cour[i].courseName,
  //                   description:cour[i].description,
  //                   duration:cour[i].duration
  //                 })
  //             }
  //           }
  //         }
  //       } 
  //     //console.log(this.courses)

  //       this.isLoaded = true;
  //     });
  //   }
  // );

  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // goToUrl(link): void {
  //   // window.open(`"${link}"`,'_target');
  //   window.location.assign(`"${link}"`)
  //   // this.router.navigate(["/dummy"]).then(result=>{window.location.href = `"${link}"`})
  // }


  getDeletedId = 0;
  courseName = ''

  openModal(content,id,cname) {
    this.getDeletedId = id;
    this.courseName = cname;
    this.modalService.open(content);
  }

  ok = 1;
  deleteCourse(){
    // this.isLoaded = false;
    this.examService.getExams().subscribe(e => {
      for(let i=0; i<e.length; i++){
        // to get the first word of the examName which is the same name of the course
        const x = e[i].examName.split(" ")[0].toLowerCase()
        if(this.courseName.toLowerCase() == x){
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

  // ngOnDestroy(){
  //   this.paths = [];
  //   this.courses = [];
  //   if (this.courses) {
  //     this.courses = [];
  //   }
  // }


}





