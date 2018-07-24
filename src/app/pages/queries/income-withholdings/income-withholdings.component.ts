import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { Angular2TokenService } from 'angular2-token';


@Component({
  selector: 'app-income-withholdings',
  templateUrl: './income-withholdings.component.html',
  styleUrls: ['./income-withholdings.component.css']
})
export class IncomeWithholdingsComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Ingresos y retenciones';
  public showExcel: boolean = true;

  constructor(public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
    private tokenService: Angular2TokenService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.accionDataTableService.getActionDataTable().subscribe((data) => {
      if (data === "Ingresos y retenciones") {
        this.queriesService.getIncomeWithholdingsExcel().subscribe((info: any) => {
          let urlSplit = info.url.split('/')[info.url.split('/').length - 2] + '/' + info.url.split('/')[info.url.split('/').length - 1];
          this.tokenService.get(urlSplit).subscribe((url: any) => {
            window.open(url.url);
          })
        })
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

  downloadFile(data: Response) {
    var blob = new Blob([data], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}
