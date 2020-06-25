import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  public isMenuCollapsed = true;

  clickedTab = '';
  activeLink = '';

  constructor(private router:Router) { }

  ngOnInit() {
  }
 

dropdownClick(){
 var dropdown = document.getElementsByClassName("dropdown");
  for (var i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    } else {
    dropdownContent.style.display = "block";
    }
    });
  }
}
 
logOut(){

  localStorage.removeItem("admin");
  localStorage.removeItem("adminId");
  this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
    this.router.navigate(["/"]);
}); 
}

}
