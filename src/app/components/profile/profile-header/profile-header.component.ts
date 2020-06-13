import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

 
  clickedTab = '';
  activeLink = '';
  constructor() {
} 

getValue(x) {
  this.clickedTab = x;
  this.activeLink = x;
}
  ngOnInit() {
  }

}
