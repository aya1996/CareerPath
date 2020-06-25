import { LoginComponent } from './../../components/login/login.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CareerService } from '../../shared/services/career.service';
import { career } from '../../shared/Models/career.model';
import { UserService } from '../../shared/services/user.service';
import { user } from 'src/app/shared/Models/user.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  token: string;
  username: string;
  isAdmin: string;
  careerData: career[];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private careerService: CareerService,
    private userService: UserService,
    ) { }

  
  ngOnInit() { 
    this.token = localStorage.getItem("Token");
    this.username = localStorage.getItem("username");

    this.isAdmin = localStorage.getItem("adminId")

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

  goToProfile(){
    this.userService.getUserProfile().subscribe(res => console.log(res));

    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/profile"]);
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
    localStorage.removeItem("completedCourses");
    localStorage.removeItem("countOfCourses");

    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
