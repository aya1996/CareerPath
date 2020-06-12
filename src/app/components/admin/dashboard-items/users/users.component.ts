import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [
    {value: '0', viewValue: 'Gin'},
    {value: '1', viewValue: 'Rem'},
    {value: '2', viewValue: 'Akai'}
  ];

  displayedColumns: string[] = ['Course', 'Score', 'Time', 'Examdate','examQs'];
  dataSource: MatTableDataSource<Exam>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {

    this.dataSource = new MatTableDataSource(EXAMS);
  }

  ngOnInit() {
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

interface User {
  value: string;
  viewValue: string;
}



