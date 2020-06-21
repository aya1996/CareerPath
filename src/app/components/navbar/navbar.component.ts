import { LoginComponent } from './../../components/login/login.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CareerService } from '../../shared/services/career.service';
import { career } from '../../shared/Models/career.model'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  token: string;
  username: string;
  careerData: career[];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private careerService: CareerService
    ) { }

  
  ngOnInit() { 
    this.token = localStorage.getItem("Token");
    this.username = localStorage.getItem("username");

    this.careerService.getCareer().subscribe(res => {
      this.careerData = res;
    })
  }

  goToRoadMap(id){
    //this.router.navigateByUrl(`/roadmap/${id}`);
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/roadmap/${id}`]);
  }); 
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
    localStorage.removeItem("userId");
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
