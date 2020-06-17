import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../../../../../shared/services/career.service';
import { SubCareerService } from '../../../../../shared/services/sub-career.service';
import { career } from '../../../../../shared/Models/career.model';
import { subCareer } from '../../../../../shared/Models/subCareer.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-path',
  templateUrl: './edit-path.component.html',
  styleUrls: ['./edit-path.component.css']
})
export class EditPathComponent implements OnInit {

  private routeSub: Subscription;

  constructor(private subCareerService:SubCareerService, 
    private careerService:CareerService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router) { }

  careers:career[] = [];
  subcareer:subCareer;
  subcareerName;
  showSpinner = true;
  
  selectedItem=0;
  
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.subCareerService.getSubCareerById(params['id'])
      .subscribe(result => {
        this.subcareer = result;

        this.careerService.getCareer()
        .subscribe(res => {
          for(let i=0; i<res.length; i++){
            if(res[i].careerId == this.subcareer.careerIdRef){
              this.subcareerName=res[i].careerName;
              break;
            }   
          }
          this.careers = res;
          this.showSpinner = false;
        });
      });
     });
    
  }

  getSelected(c_id){
    this.selectedItem = c_id;
  }

  openSnackBar() {
    this._snackBar.open('Updated..', 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

  saveData(data){
    const c = new subCareer;
    c.subCareerName = data.path;
    c.description = data.desc;
    c.subCareerId = this.subcareer.subCareerId;
    if(this.selectedItem != 0)
      c.careerIdRef = this.selectedItem;
    else
      c.careerIdRef = this.subcareer.careerIdRef;
    // console.log(c);

    // console.log(this.subcareer.subCareerId);
    this.subCareerService.editSubCareer(this.subcareer.subCareerId,c)
    .subscribe(res => console.log(res));
    this.router.navigateByUrl('/admin/index', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/path']);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}

