import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  opened: boolean;
  state = "open";

  getState(){
    if(this.opened === true)
      this.state = "close";
    else
      this.state = "open";
  }


}
