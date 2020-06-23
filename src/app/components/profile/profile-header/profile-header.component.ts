import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

 
  // clickedTab = '';
  activeLink = '';
  constructor(private router:Router) {
} 

getValue(x) {
  // this.clickedTab = x;
  this.activeLink = x;
}
  ngOnInit() {
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/profile']);
    });
  }

}
