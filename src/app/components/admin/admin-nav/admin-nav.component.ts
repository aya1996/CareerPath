import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  public isMenuCollapsed = true;

  clickedTab = '';
  constructor() { }

  ngOnInit() {
  }

  getClicked(_clickedTab){
    this.clickedTab = _clickedTab;
  }

}
