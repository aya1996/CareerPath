import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { CareerService } from '../../../../../shared/services/career.service';
import { career } from '../../../../../shared/Models/career.model';

@Component({
  selector: 'app-view-track',
  templateUrl: './view-track.component.html',
  styleUrls: ['./view-track.component.css']
})
export class ViewTrackComponent implements OnInit, OnDestroy {

  QControl = new FormControl();


  displayedColumns: string[] = ['Track', 'Description','edit'];
  dataSource: MatTableDataSource<career>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private careerService:CareerService,
    private router:Router,
    private modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.careerData);
  }

  careerData:career[] = [];
  showSpinner = true;

  ngOnInit() {
    this.careerService.getCareer().subscribe(careers => {
        for(let i=0; i<careers.length; i++){
          this.careerData[i] = careers[i];
        }
        //console.log(this.careerData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false
    });
    
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
    this.careerService.deleteCareer(this.getDeletedId).subscribe(res => {
      this.router.navigateByUrl('/admin/index', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/track']);
      });
    });
    this.modalService.dismissAll();
    
  }

  ngOnDestroy(){
    this.careerData = [];
  }

}





