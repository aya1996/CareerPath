import { Component, OnInit } from '@angular/core';

import { CareerService } from '../../../../shared/services/career.service';
import { career } from '../../../../shared/Models/career.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.css']
})
export class AddTrackComponent implements OnInit {

  constructor(private careerService:CareerService,
     private _snackBar: MatSnackBar,
     private router:Router) { }

  ngOnInit() {
  }

  saveData(data){
    const c = new career;
    c.careerName = data.path;
    c.description = data.desc;

    this.careerService.postCareer(c)
      .subscribe(res => console.log(res));
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/track']);
    });
  }

  openSnackBar() {
    this._snackBar.open('Added..', 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

}
