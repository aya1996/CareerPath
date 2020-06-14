import { Component, OnInit } from '@angular/core';

import { CareerService } from '../../../../shared/services/career.service';
import { SubCareerService } from '../../../../shared/services/sub-career.service';
import { career } from '../../../../shared/Models/career.model';
import { subCareer } from '../../../../shared/Models/subCareer.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-path',
  templateUrl: './add-path.component.html',
  styleUrls: ['./add-path.component.css']
})
export class AddPathComponent implements OnInit {

  constructor(private subCareerService:SubCareerService, 
    private careerService:CareerService,
    private _snackBar: MatSnackBar) { }

  careers:career[] = [
    {careerId:1, careerName:"fdsgds1", description:"gdsgd"},
    {careerId:2, careerName:"fdsgds2", description:"gdsgd"},
    {careerId:3, careerName:"fdsgds3", description:"gdsgd"}];

  selectedItem=0;
  ngOnInit() {
    // this.careerService.getCareer()
    //   .subscribe(res => {
    //     this.careers = res;
    //   });
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
    c.SubCareerName = data.path;
    c.Description = data.desc;
    c.CareerId = this.selectedItem;
    console.log(c);
    // this.careerService.postCareer(c)
    //   .subscribe(res => console.log(res));
  }
}
