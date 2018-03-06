import { Component, OnInit, Input } from '@angular/core';
import { Estadistics } from '../../../../models/common/widgets/widgets';


@Component({
  selector: 'app-estadistics',
  templateUrl: './estadistics.component.html',
  styleUrls: ['./estadistics.component.css']
})
export class EstadisticsComponent implements OnInit {
  @Input('estadistics') estadistics: any
  public objectWidget: Estadistics;  
 
  // public doughnutChartLabels:string[] = this.objectWidget.label;
  // public doughnutChartData:number[] = this.objectWidget.value;
  // public doughnutChartColors: any[] = this.objectWidget.gradient;
  
  public doughnutChartLabels:string[] = ['Enero', 'Febrero', 'Marzo'];;
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
  public showChartLegend : boolean = false ; 
  public doughnutChartColors: any[] = [{ backgroundColor: ["#00C660", "#67EDA8", "#B4F0D1 ", "#a4add3"] }];

  constructor() {  }

  ngOnInit() {
    this.estadistics.subscribe((data:Estadistics) => {
      this.objectWidget = data;
    })
    
  }
}
