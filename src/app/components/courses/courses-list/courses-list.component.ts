import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  careerTitle = "FrontEnd Developer";
  starName = "star-o";

  constructor(private modalService: NgbModal, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openModal(content, _courseTitle) {
    this.modalService.open(content, {centered: true});
  }

  changeStarState(){
    if(this.starName === "star")
    {
      this.starName = "star-o";
      this._snackBar.open('Removed from wishlist', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
    else
    {
      this.starName = "star";
      this._snackBar.open('Added to wishlist', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }

}
