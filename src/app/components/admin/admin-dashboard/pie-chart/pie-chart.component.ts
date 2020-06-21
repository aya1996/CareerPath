import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { CareerService } from '../../../../shared/services/career.service';
import { SubCareerService } from '../../../../shared/services/sub-career.service';

// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  // public pieChartLabels: Label[] = ['Web Development', 'Mobile Development', 'Data Science'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private careerService:CareerService,
    private subCareerService: SubCareerService) { }

  count:pathCount[] = [];
  showSpinner = true;

  ngOnInit() {
    let k;
    this.careerService.getCareer().subscribe(c => {
      this.subCareerService.getSubCareer().subscribe(s => {
        for(let i=0; i<c.length; i++){
          k = 0;
          for(let j=0; j<s.length; j++){
            if(c[i].careerId == s[j].careerIdRef){
              k++;
            }
          }
          this.count.push({name: c[i].careerName, count: k});
        }
        for(let i=0; i<this.count.length; i++){
          this.pieChartLabels.push(this.count[i].name);
          this.pieChartData.push(this.count[i].count);
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

interface pathCount{
  name?: string;
  count?: number;
}
