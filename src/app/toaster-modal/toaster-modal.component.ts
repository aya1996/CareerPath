import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { RegisterService } from '../shared/services/register.service';

@Component({
  selector: 'app-toaster-modal',
  templateUrl: './toaster-modal.component.html',
  styleUrls: ['./toaster-modal.component.css']
})
export class ToasterModalComponent implements OnInit {

  showAdd: boolean;
  showRegister: boolean;
  // showOutStock: boolean;
  constructor( private loginService: LoginService, private registerService: RegisterService) { }

  ngOnInit() {
    this.loginService.loginToaster.subscribe( data => {
    
      this.showAdd = data;
     
    })
    this.registerService.registerToaster.subscribe( data => {
    
      this.showRegister = data;
     
    })
    // this.loginService.outOfStock.subscribe( data => {
    //   this.showOutStock = data;
    // })
  }

  hideNotif() {
    this.showAdd = false;
    this.showRegister = false;
    // this.showOutStock = false;
  }



}
