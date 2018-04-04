import { Component, OnInit, Input } from '@angular/core';
import { Estadistics, Colors, DataEstadistics, Properties } from '../../../../models/common/widgets/widgets';
import { Color } from 'ng2-charts';


@Component({
  selector: 'app-estadistics',
  templateUrl: './estadistics.component.html',
  styleUrls: ['./estadistics.component.css']
})
export class EstadisticsComponent implements OnInit {
  @Input('estadistics') estadistics: any;
  public chartType : string;
  public objectWidget: Properties[] = [];
  public typeGraph : string;
  public activeBarChartType: boolean;
  public activeDoughnutChartType: boolean;
  /* Doughnut Chart*/
  public doughnutChartLabels: string[];
  public doughnutChartData: number[];
  public doughnutChartColors: any[];
  public doughnutChartType: string = 'doughnut';
  public showChartLegend: boolean = false;
  public hovered: boolean; 

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

  constructor() { }

  ngOnInit() {
        
    this.estadistics.subscribe((data: any) => {
      this.objectWidget[0] = data.properties;
      this.typeGraph = data.graph_type;
      let newChartData: Array<any> = [];
     // newChartData.push(this.objectWidget[0].barChartData);

      if (this.typeGraph === 'Doughnut') {
        //Doughnut 
        this.activeDoughnutChartType = true;
        this.doughnutChartType = 'doughnut';
        this.doughnutChartLabels = this.objectWidget[0].data.names;
        console.log(this.doughnutChartLabels)
        this.doughnutChartData = this.objectWidget[0].data.values;
        console.log(this.doughnutChartData)
        this.doughnutChartColors =[{ backgroundColor: ["#00C660", "#67EDA8", "#B4F0D1 ", "#a4add3"] }];
     
      } else
        if (this.chartType === 'bar') {
          // Bar Chart
         // this.barChartLabels = this.objectWidget[0].barChartLabels;
          this.barChartData = newChartData;
          this.barChartColors = [{ backgroundColor: ["#00C660", "#67EDA8", "#B4F0D1 ", "#a4add3"] }];
          // this.barChartColors = this.objectWidget[0].barChartColors;  


        }
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
