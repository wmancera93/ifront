import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { Router } from '@angular/router';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { Angular2TokenService } from 'angular2-token';
import { User } from '../../../models/general/user';

@Component({
  selector: 'app-vacation-balance',
  templateUrl: './vacation-balance.component.html',
  styleUrls: ['./vacation-balance.component.css']
})
export class VacationBalanceComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Saldo de vacaciones';
  public showExcel: boolean = true;
  public userAuthenticated:User;
  public countAfter: number = 0;

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
      if (data === "Saldo de vacaciones" && this.countAfter === 0) {
        this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
        this.queriesService.getBalanceVacationExcel(this.userAuthenticated.employee_id.toString()).subscribe((info: any) => {
          window.open(info.url);
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

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
