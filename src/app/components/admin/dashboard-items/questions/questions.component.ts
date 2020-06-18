import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { question } from '../../../../shared/Models/question.model';
import { questionService} from '../../../../shared/services/question.service';
import { CourseService} from '../../../../shared/services/course.service';
import { course } from '../../../../shared/Models/course.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  QControl = new FormControl();
 


  displayedColumns: string[] = ['questionName', 'choiceOne', 'choiceTwo', 'choiceThree','grade','rightAnswer','courseName', 'edit','delete'];
  dataSource: MatTableDataSource<question>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private questionService:questionService, 
    private CourseService:CourseService,
    private modalService: NgbModal,
    private router:Router) {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.questionData);
  }
  questionData  = [];
  course=[]
  showSpinner = true;
  
  ngOnInit() {

    this.questionService.getQuestion().subscribe(res => {
    this.CourseService.getCourse().subscribe(courses => {
        for(let i=0; i<res.length; i++){
          this.questionData[i]=res[i];
          for(let j=0; j<courses.length; j++){
            this.course[j]=courses[j];
            if(courses[j].courseId === this.questionData[i].courseIdRef){
              this.questionData[i].courseName = courses[j].courseName;
            }
          }
        }
        // console.log(this.questionData)
        this.showSpinner = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.questionData);
        // console.log(this.course);
      });
      this.showSpinner = false
    })
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDeletedId = 0;

  openModal(content,id) {
    this.getDeletedId = id;
    this.modalService.open(content);
  }
  deleteQuest(){
    this.questionService.deleteQuestion(this.getDeletedId).subscribe(res => console.log(res));
    this.modalService.dismissAll();
    this.router.navigateByUrl('/admin/index', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/question']);
    });
  }
}

