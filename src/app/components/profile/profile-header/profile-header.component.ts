import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service'

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

 
  // clickedTab = '';
  activeLink = '';
  constructor(private router:Router, private userService:UserService) {
} 

getValue(x) {
  // this.clickedTab = x;
  this.activeLink = x;
}
  ngOnInit() {
      this.userService.getUserProfile().subscribe(res => {
        console.log(res);
      })
  }

}
