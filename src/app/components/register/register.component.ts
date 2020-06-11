import { RegisterService } from './../../shared/services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;
  public defaultImage = true;
  countries: any = [];
  registerForm: FormGroup;
  constructor(
    private service: RegisterService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        id: [0],
        subCareerId: ['', Validators.required],
        fname: ['', Validators.required],
        lname: [''],
        country: [''],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        userLevel: ['', Validators.required],
        description: ['', Validators.required],
        image: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }
  register() {

    if (this.registerForm.value.id === 0) {
      this.service.register(this.registerForm.value).subscribe(
        () => {
          alert('Subscription successful');
        },
        error => {
          alert(error);
        }
      );
    }
  }

  preview(files) {
    if (files.length === 0) {

      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.defaultImage = false;
    };
  }

}
