import { Component, OnInit, OnDestroy } from '@angular/core';
import { CareerService } from '../../../../../shared/services/career.service';
import { career } from '../../../../../shared/Models/career.model';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.css']
})
export class EditTrackComponent implements OnInit, OnDestroy {

  constructor(private careerService:CareerService,
    private _snackBar: MatSnackBar,
    private router:Router,
    private route: ActivatedRoute) { }

  private routeSub: Subscription;
  showSpinner = true;
  careerItem : career;
  careerId;
 ngOnInit() {
  this.routeSub = this.route.params.subscribe(params => {
    this.careerService.getCareerById(params['id'])
    .subscribe(res => {
      this.careerId = params['id'];
      this.careerItem = res;
      this.showSpinner = false;
    })
    
  });
 }

 saveData(data){
   const c = new career;
   c.careerName = data.path;
   c.description = data.desc;
  c.careerId = this.careerId;
   this.careerService.updateCareer(this.careerId,c)
     .subscribe(res => console.log(res));
   this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
     this.router.navigate(['/admin/track']);
   });
 }

 openSnackBar() {
   this._snackBar.open('Updated..', 'X', {
     duration: 2000,
     horizontalPosition: "right",
     verticalPosition: "bottom",
   });
 }

 ngOnDestroy() {
  this.routeSub.unsubscribe();
}

}

