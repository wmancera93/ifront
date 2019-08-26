import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { Router } from '@angular/router';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-vacation-balance',
  templateUrl: './vacation-balance.component.html',
  styleUrls: ['./vacation-balance.component.css'],
})
export class VacationBalanceComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public showExcel = true;
  public userAuthenticated: User;
  public countAfter = 0;
  private subscriptions: ISubscription[];


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.queries.vacation_balance.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    public router: Router,
    private accionDataTableService: DataDableSharedService,
  ) {}

  ngOnInit() {
    this.subscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe(() => {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getBalanceVacationExcel(
            this.userAuthenticated.employee_id.toString(),
          )
          .subscribe((info: any) => {
            window.open(info.url);
          });
      }),
      this.queriesService.getVacationBalance().subscribe(
        (data: any) => {
          this.objectReport.emit(data);
        },
        error => {
          console.log(error.error);
        },
      ),
    ];
  }
  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
