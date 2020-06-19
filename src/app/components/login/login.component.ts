import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';

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
  constructor(public activeModal: NgbActiveModal, private loginService: LoginService
 ) { }
  login() {
    console.log("Login Form", this.loginForm.value)
    const model = {
      UserName: this.loginForm.value.username,
      Password: this.loginForm.value.password
    }
    this.loginService.login(model).subscribe( (res: any) => {
      console.log("res", res)
      localStorage.setItem("Token", res.token)
      this.activeModal.close();
      this.loginService.showToaster()
    }, error => {
      console.error("error", error)
    })
  }
}
