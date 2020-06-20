import { LoginComponent } from './../../components/login/login.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  token: string;
  username: string;
  constructor(
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit() { 
    this.token = localStorage.getItem("Token")
    this.username = localStorage.getItem("username")
  }

  open() {
    const modelRef = this.modalService.open(LoginComponent);
    modelRef.componentInstance.name = 'Maher';
  }
  register() {
    this.router.navigate(['/register']);
  }

  logout(){
    localStorage.removeItem("Token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
