import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { user } from '../../../../shared/Models/user.model'

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
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(res => {
      console.log(res.userData.subCareerId);
      console.log(res.userData.userLevel);
    })
  }

}


