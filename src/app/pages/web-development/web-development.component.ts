import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-development',
  templateUrl: './web-development.component.html',
  styleUrls: ['./web-development.component.css']
})
export class WebDevelopmentComponent implements OnInit {

  webDev: any = [];
  constructor() { }

  ngOnInit() {
    this.webDev = [
      { name: 'HTML', description: 'Test yourself now!' },
      { name: 'CSS', description: 'Test yourself now!' },
      { name: 'HTML5', description: 'Test yourself now!' },
      { name: 'CSS3', description: 'Test yourself now!' },
      { name: 'Javascript', description: 'Test yourself now!' },
      { name: 'Anguler2', description: 'Test yourself now!' },
    ];
  }









}
