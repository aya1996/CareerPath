import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

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

