import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { user } from '../../../shared/Models/user.model'
import { SubCareerService } from '../../../shared/services/sub-career.service';
import { subCareer } from '../../../shared/Models/subCareer.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
   users:user;
   pathData:subCareer[]
   spinner=true;
  constructor(private userService: UserService, private subCareerService:SubCareerService,) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(res => {
      this.users=res
      this.subCareerService.getSubCareer().subscribe(path => {
        console.log(path);
      for(let j=0; j<path.length; j++){
        this.pathData=path;
      if(this.users.userData.subCareerId=== this.pathData[j].subCareerId){
        this.users.userData.subCareer = this.pathData[j].subCareerName;
        console.log( this.users.userData.subCareer);
      }
    }
      console.log(this.users.userData);
      console.log(this.users.info);
      console.log(res);

      this.spinner=false;
      // console.log(localStorage.getItem("Token"))
    })
  
  });
  }


}
