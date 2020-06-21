import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { user } from '../../../shared/Models/user.model'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
   users:user;
   spinner=true;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(res => {
      this.users=res

      console.log(this.users.userData);
      console.log(res.info);
      console.log(res);
        this.spinner=false;
      // console.log(localStorage.getItem("Token"))
    })
  }


}
