import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

import { SubCareerService } from '../../../../shared/services/sub-career.service';
import { CourseService } from '../../../../shared/services/course.service';
import { number } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  subCareerCoursesCount: CoursesCount[] = [];
  data = [];
  showSpinner = true;

  barChartLabels: Label[] = [];
  // public barChartLabels: Label[] = this.labels;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  // barChartData: ChartDataSets[] = [];
  public barChartData: ChartDataSets[] = [
    { data: this.data, label: 'Total Courses' }
  ];

  constructor(private subcareerService:SubCareerService,
    private courseService: CourseService) { }

  ngOnInit() {
    let k ;
    this.subcareerService.getSubCareer().subscribe(res => {
      this.courseService.getSubCareerCourses().subscribe(c => {
        for(let i=0; i<res.length; i++){
          k = 0;
          for(let j=0; j<c.length; j++){
            if(res[i].subCareerId === c[j].subCareerId){
              k++;
            }
          }
          this.subCareerCoursesCount.push({name: res[i].subCareerName, count: k});
        }
        console.log(this.subCareerCoursesCount);
        for(let i=0; i<this.subCareerCoursesCount.length; i++){
          this.barChartLabels.push(this.subCareerCoursesCount[i].name);
          this.data.push(this.subCareerCoursesCount[i].count);
        }
      })
      this.showSpinner = false;
    })
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}

interface CoursesCount{
    name?: string;
    count?: number;
}
