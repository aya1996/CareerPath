import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css']
})
export class CourseModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  closeResult: string;

  openModal(content) {
    this.modalService.open(content, {centered: true, backdropClass: 'light-blue-backdrop', windowClass: 'dark-modal'});
  }

}
