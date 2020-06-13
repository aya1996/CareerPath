import { Component, OnInit } from '@angular/core';

import { CareerService } from '../../../../shared/services/career.service';
import { career } from '../../../../shared/Models/career.model';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.css']
})
export class AddTrackComponent implements OnInit {

  constructor(private careerService:CareerService) { }

  ngOnInit() {
  }

  saveData(data){
    const c = new career;
    c.CareerName = data.path;
    c.Description = data.desc

    this.careerService.postCareer(c)
      .subscribe(res => console.log(res));
  }

}
