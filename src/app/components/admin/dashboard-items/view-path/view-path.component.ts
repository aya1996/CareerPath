import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { CareerService } from '../../../../shared/services/career.service';
import { SubCareerService } from '../../../../shared/services/sub-career.service';
import { subCareer } from '../../../../shared/Models/subCareer.model';


@Component({
  selector: 'app-view-path',
  templateUrl: './view-path.component.html',
  styleUrls: ['./view-path.component.css']
})
export class ViewPathComponent implements OnInit, OnDestroy {

  QControl = new FormControl();


  displayedColumns: string[] = ['Track', 'Path', 'Description','edit','delete'];
  dataSource: MatTableDataSource<subCareer>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private careerService:CareerService, 
    private subCareerService:SubCareerService,
    private router:Router,
    private modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.careerData);
  }

  careerData: subCareer[] = [];
  showSpinner = true;

  ngOnInit() {

    this.careerService.getCareer().subscribe(careers => {
      this.subCareerService.getSubCareer().subscribe(res => {
        for(let i=0; i<res.length; i++){
          this.careerData[i]=res[i];
          for(let j=0; j<careers.length; j++){
            if(careers[j].careerId === this.careerData[i].careerIdRef){
              this.careerData[i].careerName = careers[j].careerName;
              break;
            }
          }
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.careerData);
      });
      this.showSpinner = false
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDeletedId = 0

  openModal(content,id) {
    this.getDeletedId = id;
    this.modalService.open(content);
  }
  
  delete(){

    this.subCareerService.deleteSubCareer(this.getDeletedId).subscribe(res => console.log(res));

    this.modalService.dismissAll();
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/path']);
    });
  }

  ngOnDestroy(): void {
    this.careerData = [];
  }

}




