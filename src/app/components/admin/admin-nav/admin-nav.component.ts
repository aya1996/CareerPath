import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  clickedTab = '';
  activeLink = '';
  constructor() { }

  ngOnInit() {
  }

  getClicked(_clickedTab){
    this.clickedTab = _clickedTab;
    this.activeLink = _clickedTab;
  }

}
