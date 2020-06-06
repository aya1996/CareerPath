import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courseTitle:String = '';
  courseInfo = {courseLink: 'www.youtube.com/fsjfkasg', courseDuration: 30}
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModal(content, _courseTitle) {
    this.courseTitle = _courseTitle;
    this.modalService.open(content, {centered: true, backdropClass: 'dark-modal'});
  }

}
