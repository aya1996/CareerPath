import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';


interface Questions {
  id: number;
  title: string;
  choice1: string;
  choice2: string;
  choice3: string;
}
const QUESTIONS: Questions[] = [
  {
    id: 1,
    title:'What is HTML stands for?',
    choice1:'hijkl,',
    choice2:'hijkl,',
    choice3:'hijkl,'
  },
  {
    id: 2,
    title:'sample questionfks ?',
    choice1:'hijkl,',
    choice2:'hijkl,',
    choice3:'hijkl,'
  },
  {
    id: 3,
    title:'Wfgfdslm omes?',
    choice1:'hijkl,',
    choice2:'hijkl,',
    choice3:'hijkl,'
  },
  {
    id: 4,
    title:'What is HTML stands for?',
    choice1:'hijkl,',
    choice2:'hijkl,',
    choice3:'hijkl,'
  },
  {
    id: 5,
    title:'Whjao ojtlasa ?',
    choice1:'hijkl,',
    choice2:'hijkl,',
    choice3:'hijkl,'
  },
  {
    id: 6,
    title:'What is HTML stands for?',
    choice1:'hijkl,',
    choice2:'hijkl,',
    choice3:'hijkl,'
  }
];

interface Course {
  value: string;
  viewValue: string;
}

interface CourseGroup {
  name: string;
  course: Course[];
}


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  pokemonControl = new FormControl();
  courseGroups: CourseGroup[] = [
    {
      name: 'Frontend',
      course: [
        {value: 'id1', viewValue: 'HTML'},
        {value: 'id2', viewValue: 'CSS'},
        {value: 'id3', viewValue: 'Javascript'},
        {value: 'id4', viewValue: 'JQuery'},
        {value: 'id5', viewValue: 'Angular'},
      ]
    },
    {
      name: 'Backend',
      course: [
        {value: 'id1', viewValue: 'C#'},
        {value: 'id2', viewValue: 'ASP.Net'},
        {value: 'id3', viewValue: 'MVC'},
        {value: 'id4', viewValue: 'EF'},
        {value: 'id5', viewValue: 'SQL Server'},
      ]
    },
  ];




  displayedColumns: string[] = ['title', 'choice1', 'choice2', 'choice3','edit'];
  dataSource: MatTableDataSource<Questions>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(QUESTIONS);
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

