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
  public chartType: string;
  public objectWidget: Properties[] = [];
  public typeGraph: string;
  public activeBarChartType: boolean;
  public activeDoughnutChartType: boolean;
  /* Doughnut Chart*/
  public doughnutChartLabels: string[];
  public doughnutChartData: number[];
  public doughnutChartColors: any[];
  public doughnutOptions: any;
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


  constructor() {
  }

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
        this.doughnutChartData = this.objectWidget[0].data.values;
        this.doughnutChartColors = [{ backgroundColor: this.objectWidget[0].data.colors }];
        this.doughnutOptions = {
          responsive: true,
          pieceLabel: {
           
            render: function (args) {
              return '$' + args.value;
            },
            fontSize: 9,
            fontColor: '#000',
            overlap: true,
            arc: true
          },
        };

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

  chartHovered(a: any): void {
    // if (e.active.length > 0){
    //   const chart = e.active[0]._chart;
    //   const activePoints = chart.getElementAtEvent(e.event);
    //   if ( activePoints.length > 0){
    //     const clickedElementIndex = activePoints[0]._index;
    //     const label = chart.data.labels[clickedElementIndex];
    //     const value = chart.data.datasets[0].data[clickedElementIndex];
    //     console.log(label,value)
    //   }
    // }
  }

  chartClicked(e: any): void {
    console.log(e)
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if (activePoints.length > 0) {
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        const value = chart.data.datasets[0].data[clickedElementIndex];
      }
    }
  }
}
