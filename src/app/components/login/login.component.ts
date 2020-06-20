import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() name;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(public activeModal: NgbActiveModal, 
    private loginService: LoginService,
    private router:Router
 ) { }
  login() {
    console.log("Login Form", this.loginForm.value)
    const model = {
      UserName: this.loginForm.value.username,
      Password: this.loginForm.value.password
    }
    this.loginService.login(model).subscribe( (res: any) => {
     // console.log("res", res)

      this.loginService.getAllUsers().subscribe(user => {
        
        for(let i=0; i<user.length; i++){
          if(model.UserName == user[i].userName){
            console.log(user);
            const fullname = `${user[i].fname} ${user[i].lname}`;
            localStorage.setItem("username",fullname)
            localStorage.setItem("userId", user[i].id);
            console.log(user[i].id)
            break;
          }
        }
      })

      localStorage.setItem("Token", res.token)
      this.activeModal.close();
      this.loginService.showToaster()

      this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/']);
      });
    }, error => {
      console.error("error", error)
    })
  }
}
