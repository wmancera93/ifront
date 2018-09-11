import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { Angular2TokenService } from 'angular2-token';
import { User } from '../../../models/general/user';


@Component({
  selector: 'app-income-withholdings',
  templateUrl: './income-withholdings.component.html',
  styleUrls: ['./income-withholdings.component.css']
})
export class IncomeWithholdingsComponent implements OnInit, OnDestroy  {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Ingresos y retenciones';
  public showExcel: boolean = true;
  public userAuthenticated:User;
  public countAfter: number = 0;

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
      if (data === "Ingresos y retenciones" && this.countAfter === 0) {
        this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
        this.queriesService.getIncomeWithholdingsExcel(this.userAuthenticated.employee_id.toString()).subscribe((info: any) => {
          window.open(info.url);
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
    // var blob = new Blob([data], { type: 'text/csv' });
    // var url = window.URL.createObjectURL(blob);
    // window.open(url);
  }

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
