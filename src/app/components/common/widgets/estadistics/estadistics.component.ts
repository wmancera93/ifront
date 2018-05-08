import { Component, OnInit, Input } from '@angular/core';
import { Estadistics, Colors, DataEstadistics, Properties } from '../../../../models/common/widgets/widgets';
import { Color } from 'ng2-charts';
import { debug } from 'util';

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
      //newChartData.push(this.objectWidget[0].data.values);

      if (this.typeGraph === 'Doughnut') {
        //Doughnut 
        this.activeDoughnutChartType = true;
        this.doughnutChartType = 'doughnut';
        this.doughnutChartLabels = this.objectWidget[0].data.names;
        this.doughnutChartData = this.objectWidget[0].data.values;
        this.doughnutChartColors = [{ backgroundColor: this.objectWidget[0].data.colors}];
        this.doughnutOptions = {
          responsive: true,
          tooltips:
          {
            enabled: true,  
            mode: 'single',
            callbacks:{
              label: function(tooltipItem, data) {
                let label = data.labels[tooltipItem.index];
                let datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                let dataNumber = new Number(datasetLabel);
                return label + ': ' + dataNumber.toLocaleString();
              }
            }         
             
            
          }
            


        };

      } else
        if (this.typeGraph === 'Bar') {
          // Bar Chart

          this.activeBarChartType = true;
          this.barChartType = 'bar';
          this.barChartLabels = this.objectWidget[0].data.names;
          this.barChartData = this.objectWidget[0].data.values;
          this.barChartColors = [{ backgroundColor: this.objectWidget[0].data.colors }];
          this.barChartOptions = {
            responsive: true,
            scales: {
              xAxes: [{
                display: false,
                stacked: true,

              }],
              yAxes: [{
                display: false,
                stacked: true,
                ticks: {
                  fontSize: 13,
                  fontStyle: 'normal',
                }
              }],

            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true,
              callbacks: {
                label: function (tooltipItems) {
                  return tooltipItems.yLabel.toLocaleString();
                },
                // label: function (tooltipItem) {
                //   return tooltipItem.yLabel;
                // }
              },
              // scaleLabel:
              //   function (barChartLabels) {
              //     return barChartLabels.datasetLabel + ': ' + barChartLabels.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              //   }
            }
          }


        }
      if (this.chartType === 'Bar') {

        this.activeBarChartType = true;
        this.activeDoughnutChartType = false;
      }
      if (this.chartType === 'Doughnut') {
        this.activeDoughnutChartType = true;
        this.activeBarChartType = false;
      }
    });
  }

  chartHovered(a: any): void {
  }

  chartClicked(e: any): void {
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
