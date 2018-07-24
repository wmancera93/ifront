import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { Router } from '@angular/router';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-vacation-balance',
  templateUrl: './vacation-balance.component.html',
  styleUrls: ['./vacation-balance.component.css']
})
export class VacationBalanceComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Saldo de vacaciones';
  public showExcel: boolean = true;


  constructor(public queriesService: QueriesService,
    public router: Router,
    private accionDataTableService: DataDableSharedService,
    private tokenService: Angular2TokenService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.accionDataTableService.getActionDataTable().subscribe((data) => {
      if (data === "Saldo de vacaciones") {
        this.queriesService.getBalanceVacationExcel().subscribe((info: any) => {
          let urlSplit = info.url.split('/')[info.url.split('/').length - 2] + '/' + info.url.split('/')[info.url.split('/').length - 1];
          this.tokenService.get(urlSplit).subscribe((url: any) => {
            window.open(url.url);
          });
        })
      }
    });
    this.queriesService.getVacationBalance()
      .subscribe((data: any) => {
        this.objectReport.emit(data);
      },
        error => {
          console.log(error.error);
        })
  }
  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }
}
