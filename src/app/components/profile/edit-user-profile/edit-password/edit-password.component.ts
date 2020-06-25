import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { editUser } from '../../../../shared/Models/editUser'
import {EditUserPassword  } from '../../../../shared/services/editPassword.service';
import { password } from '../../../../shared/Models/password.model'
import { MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private EditUserPassword:EditUserPassword,private UserService:UserService,private router: Router, private _snackBar: MatSnackBar,private route: ActivatedRoute) { }
  showSpinner = true;
  uId;
users:editUser
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {

      this.UserService.getUserById(params['id'])
        .subscribe(res => {
          this.users = res;
          console.log(this.users)
          this.uId = params['id'];
          
        })
      this.showSpinner = false;
    });
  }
  saveData(data) {
    const u = new password;
    u.UserID = this.uId;
    u.oldPassword= data.password;
    u.newPassword = data.npassword;
 console.log(data.password)
 console.log(data.npassword)

    this.EditUserPassword.updateUser(this.uId, u).subscribe(res => {
      
      console.log(res)
      this.openSnackBar();
      this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/user-profile']);
      });
    }, error=> {
      console.log("error", error);
      window.alert("Enter right password")

    });
  }

  openSnackBar() {
    this._snackBar.open('Updated..', 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }


}
