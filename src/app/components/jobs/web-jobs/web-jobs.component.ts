import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-jobs',
  templateUrl: './web-jobs.component.html',
  styleUrls: ['./web-jobs.component.css']
})
export class WebJobsComponent implements OnInit {

  constructor() { }

  data = [
    {
      desc:"ahfiosajfiojaioj iaowjois oiaj;oifjoigaoitio iaojtoiejitj iawotjioangkajiwrj oaijfokzsl;",
      title:"Web Development 1"
    },
    {
      desc:"ahfiosajfiojaioj iaowjois oiaj;oifjoigaoitio iaojtoiejitj iawotjioangkajiwrj oaijfokzsl;",
      title:"Web Development 2"
    },
    {
      desc:"ahfiosajfiojaioj iaowjois oiaj;oifjoigaoitio iaojtoiejitj iawotjioangkajiwrj oaijfokzsl;",
      title:"Web Development 3"
    },
    {
      desc:"ahfiosajfiojaioj iaowjois oiaj;oifjoigaoitio iaojtoiejitj iawotjioangkajiwrj oaijfokzsl;",
      title:"Web Development 4"
    },
    {
      desc:"ahfiosajfiojaioj iaowjois oiaj;oifjoigaoitio iaojtoiejitj iawotjioangkajiwrj oaijfokzsl;",
      title:"Web Development 5"
    },
    {
      desc:"ahfiosajfiojaioj iaowjois oiaj;oifjoigaoitio iaojtoiejitj iawotjioangkajiwrj oaijfokzsl;",
      title:"Web Development 6"
    }
  ]

  ngOnInit() {
  }

  checkIndex(i:number){
    if(i%2 == 0)
      return true;
    else if(i%2 != 0)
      return false;
  }

}
