import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-doughnu',
  templateUrl: './doughnu.component.html',
  styleUrls: ['./doughnu.component.css']
})
export class DoughnuComponent{

  showSpinner = true;
  completed = 0;
  remain = 0;


  public doughnutChartLabels: Label[] = ['Completed', 'UnCompleted'];
  public doughnutChartData: SingleDataSet = [this.completed, this.remain];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {

    let count = parseInt(localStorage.getItem("countOfCourses"));
    let finished = parseInt(localStorage.getItem("completedCourses"))

    this.completed = finished;
    this.remain = count - finished;

    this.doughnutChartData = [this.completed, this.remain]

    this.showSpinner = false;
  }

  // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

}
