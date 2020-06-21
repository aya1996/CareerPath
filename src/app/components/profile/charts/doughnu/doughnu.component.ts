import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnu',
  templateUrl: './doughnu.component.html',
  styleUrls: ['./doughnu.component.css']
})
export class DoughnuComponent{

  public doughnutChartLabels: Label[] = ['Completed', 'UnCompleted'];
  public doughnutChartData: MultiDataSet = [
    [5, 20],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

  // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

}
