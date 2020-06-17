import { Component, OnInit } from '@angular/core';

import { CareerService } from '../../../../shared/services/career.service';
import { SubCareerService } from '../../../../shared/services/sub-career.service';
import { career } from '../../../../shared/Models/career.model';
import { subCareer } from '../../../../shared/Models/subCareer.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-path',
  templateUrl: './add-path.component.html',
  styleUrls: ['./add-path.component.css']
})
export class AddPathComponent implements OnInit {

  constructor(private subCareerService:SubCareerService, 
    private careerService:CareerService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  careers:career[] = [];

  selectedItem=0;
  ngOnInit() {
    this.careerService.getCareer()
      .subscribe(res => {
        this.careers = res;
      });
  }

  getSelected(c_id){
    this.selectedItem = c_id;
  }

  openSnackBar() {
    this._snackBar.open('Added..', 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

  saveData(data){
    const c = new subCareer;
    c.subCareerName = data.path;
    c.description = data.desc;
    c.careerIdRef = this.selectedItem;
    console.log(c);
    this.subCareerService.postSubCareer(c)
    .subscribe(res => console.log(res));
    this.router.navigateByUrl('/admin/index', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/path']);
    });
  }
}
