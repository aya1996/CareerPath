import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  data = [
    {
      course:'html',
      remain:100
    },
    {
      course:'css',
      remain:40
    },
    {
      course:'js',
      remain:0
    },
    {
      course:'jquery',
      remain:0
    },
    {
      course:'bootstrap',
      remain:0
    },
    {
      course:'html',
      remain:0
    },
    {
      course:'html',
      remain:0
    },
    {
      course:'html',
      remain:0
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}


