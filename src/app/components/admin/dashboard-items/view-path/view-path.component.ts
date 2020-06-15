import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

import { CareerService } from '../../../../shared/services/career.service';
import { SubCareerService } from '../../../../shared/services/sub-career.service';
import { subCareer } from '../../../../shared/Models/subCareer.model';
import { career } from '../../../../shared/Models/career.model';

// interface Path {
//   id: number;
//   track: string;
//   path: string;
//   description: string;
//   numOfCourses: number;
// }
// const PATHS: Path[] = [
//   {
//     id: 1,
//     track: 'Web Development',
//     path: 'Frontend',
//     description: 'Design webpages',
//     numOfCourses: 15
//   },
//   {
//     id: 1,
//     track: 'Web Development',
//     path: 'Backend',
//     description: 'Implement webpages',
//     numOfCourses: 20
//   },
//   {
//     id: 1,
//     track: 'Web Development',
//     path: 'Fullstack',
//     description: 'Design and Implement webpages',
//     numOfCourses: 33
//   },
//   {
//     id: 1,
//     track: 'Mobile Development',
//     path: 'Android',
//     description: 'Create Android Mobile Apps',
//     numOfCourses: 17
//   },
//   {
//     id: 1,
//     track: 'Mobile Development',
//     path: 'IOS',
//     description: 'Create IOS Mobile Apps',
//     numOfCourses: 10
//   },
//   {
//     id: 1,
//     track: 'Mobile Development',
//     path: 'IOS',
//     description: 'Create IOS Mobile AppsCreate IOS Mobile AppsCreate IOS Mobile AppsCreate IOS Mobile Apps',
//     numOfCourses: 10
//   }
  
// ];


@Component({
  selector: 'app-view-path',
  templateUrl: './view-path.component.html',
  styleUrls: ['./view-path.component.css']
})
export class ViewPathComponent implements OnInit {

  QControl = new FormControl();


  displayedColumns: string[] = ['Track', 'Path', 'Description', 'NumOfCourses','edit'];
  dataSource: MatTableDataSource<subCareer>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private careerService:CareerService, private subCareerService:SubCareerService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.careerData);
  }

  careerData: subCareer[] = [];


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.careerService.getCareer().subscribe(careers => {
      this.subCareerService.getSubCareer().subscribe(res => {
        for(let i=0; i<res.length; i++){
          this.careerData[i]=res[i];
          for(let j=0; j<careers.length; j++){
            if(careers[j].careerId === this.careerData[i].careerIdRef){
              this.careerData[i].careerName = careers[j].careerName;
            }
          }
        }
        // console.log(this.careerData);
      });
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}




