import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  username = "Kholoud Essam";
  clickedTab = '';

  constructor() {
} 

getValue(x) {
  this.clickedTab = x;
}
  ngOnInit() {
  }

}
