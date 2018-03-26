import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';

@Component({
  selector: 'app-income-withholdings',
  templateUrl: './income-withholdings.component.html',
  styleUrls: ['./income-withholdings.component.css']
})
export class IncomeWithholdingsComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Ingresos y retenciones';
  
  constructor(public queriesService: QueriesService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
       
    this.queriesService.getIncomeWithholdings()
    .subscribe((data: any) => {
     this.objectReport.emit(data);
    },
    error => {
      console.log(error.error);
    })
  }

}
