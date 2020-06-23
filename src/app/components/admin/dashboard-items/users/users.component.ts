import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { ExamService , exams} from '../../../../shared/services/exam.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['Username', 'Course', 'Examdate','examQs'];
  dataSource: MatTableDataSource<Exam>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService:UserService,
    private examService: ExamService) {

    this.dataSource = new MatTableDataSource(EXAMS);
  }
  usersExam : exams[] = [];

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res => {
      for(let i=0; i<res.length; i++){
        this.examService.getExamByUsername(res[i].userName).subscribe(ex => {
          for(let j=0; j<ex.length; j++){
            this.usersExam.push({
              userName:res[i].userName,
              courseName: ex[j].courseName,
              dateTime: ex[i].dateTime.slice(0,10)
            });
          }
        })
      }
      console.log(this.usersExam);
    })


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


interface Exam {
  course: string,
  score: number,
  time: number,
  examDate: string,
}
const EXAMS: Exam[] = [
  {
    course: 'HTML',
    score: 17,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'CSS',
    score: 19,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  },
  {
    course: 'Javascript',
    score: 15,
    time: 20,
    examDate: '15/5/2020'
  }
  
];




