import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';

@Component({
  selector: 'app-income-withholdings',
  templateUrl: './income-withholdings.component.html',
  styleUrls: ['./income-withholdings.component.css']
})
export class IncomeWithholdingsComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Ingresos y retenciones';
  public showExcel : boolean =  true;
  
  constructor(public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
       
    this.accionDataTableService.getActionDataTable().subscribe((data)=>{
      if(data ==="Ingresos y retenciones")
      {

      }
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
