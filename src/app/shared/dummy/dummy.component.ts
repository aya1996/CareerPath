import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html'
})
export class DummyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.getItem("username");
  }

}
