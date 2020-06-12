import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';

interface Paths {
  id: number;
  title: string;
  link: string;
  description: string;
  duration: number,
  numOfUsers: number
}
const PATH: Paths[] = [
  {
    id: 1,
    title: 'HTML',
    link: 'www.youtube.com/hjlk',
    description: 'Free Mosh Course',
    duration: 18,
    numOfUsers: 6
  },
  {
    id: 1,
    title: 'HTML',
    link: 'www.youtube.com/hjlk',
    description: 'Free Mosh Course',
    duration: 11,
    numOfUsers: 6
  },
  {
    id: 1,
    title: 'CSS',
    link: 'www.youtube.com/hjlk',
    description: 'Free Mosh Course',
    duration: 22,
    numOfUsers: 6
  },
  {
    id: 1,
    title: 'JS',
    link: 'www.youtube.com/hjlk',
    description: 'Free Mosh Course',
    duration: 18,
    numOfUsers: 6
  }

];

interface Path {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  QControl = new FormControl();
 
  paths: Path[] = [
    {value: '0', viewValue: 'Frontend'},
    {value: '1', viewValue: 'Backend'},
    {value: '2', viewValue: 'Fullstack'}
  ];

  displayedColumns: string[] = ['title', 'link', 'description', 'duration', 'numOfUsers','edit'];
  dataSource: MatTableDataSource<Paths>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(PATH);
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



