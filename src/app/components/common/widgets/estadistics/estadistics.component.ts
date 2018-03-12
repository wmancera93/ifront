import { Component, OnInit, Input } from '@angular/core';
import { Estadistics, ColorLineChart, BarCharData, Colors } from '../../../../models/common/widgets/widgets';
import { Color } from 'ng2-charts';


@Component({
  selector: 'app-estadistics',
  templateUrl: './estadistics.component.html',
  styleUrls: ['./estadistics.component.css']
})
export class EstadisticsComponent implements OnInit {
  @Input('estadistics') estadistics: any
  public objectWidget: Estadistics[] = [];
  public chartType: string;
  public activeBarChartType: boolean;
  public activeDoughnutChartType: boolean;
  /* Doughnut Chart*/
  public doughnutChartLabels: string[];
  public doughnutChartData: number[];
  public doughnutChartColors: any[];
  public doughnutChartType: string = 'doughnut';
  public showChartLegend: boolean = false;
  public hovered: boolean;

  /* Line Chart */
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];
  public lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  /* Bar Chart */
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;
  public barChartData: Array<any> = [];
  public barChartColors: any[];
  // public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartData:number[] = [65, 59, 80, 81, 56, 55, 40];
  //  public barChartData:any[] = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  // ];
  // public barChartColors: any[] = [{ backgroundColor: ["#00C660", "#67EDA8", "#B4F0D1 ", "#a4add3"] }];

  constructor() { }

  ngOnInit() {
    this.estadistics.subscribe((data: Estadistics) => {
      this.objectWidget[0] = data;
      this.chartType = this.objectWidget[0].canvasType;
      let newChartData: Array<any> = [];
      newChartData.push(this.objectWidget[0].barChartData);

      if (this.chartType === 'doughnut') {
        //Doughnut      
        this.doughnutChartLabels = this.objectWidget[0].doughnutChartLabels;
        this.doughnutChartData = this.objectWidget[0].doughnutChartData;
        this.doughnutChartColors =[{ backgroundColor: ["#00C660", "#67EDA8", "#B4F0D1 ", "#a4add3"] }];
     
                // this.doughnutChartColors = this.objectWidget[0].doughnutChartColors;

      } else
        if (this.chartType === 'bar') {
          // Bar Chart
          this.barChartLabels = this.objectWidget[0].barChartLabels;
          this.barChartData = newChartData;
          this.barChartColors = [{ backgroundColor: ["#00C660", "#67EDA8", "#B4F0D1 ", "#a4add3"] }];
          // this.barChartColors = this.objectWidget[0].barChartColors;  


        }
      // LineChart
      // this.lineChartLabels = this.objectWidget[0].lineChartLabels;
      // this.lineChartData = this.objectWidget[0].lineChartData;
      // this.lineChartColors = this.objectWidget[0].lineChartColors;
      if (this.chartType === 'bar') {

        this.activeBarChartType = true;
        this.activeDoughnutChartType = false;
      }
      if (this.chartType === 'doughnut') {
        this.activeDoughnutChartType = true;
        this.activeBarChartType = false;
      }
    });
  }
  public chartClicked(e: any) {
    //console.log(e)
  }

  chartHovered(e: any): void {
    // console.log(e);
  }
}
