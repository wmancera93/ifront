import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-income-withholdings',
  templateUrl: './income-withholdings.component.html',
  styleUrls: ['./income-withholdings.component.css']
})
export class IncomeWithholdingsComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public showExcel = true;
  public userAuthenticated: User;
  private subscriptions: ISubscription[];

  parseT(key) {
    return `pages.queries.income_withholdings.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService
  ) {}

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.subscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe(() => {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getIncomeWithholdingsExcel(
            this.userAuthenticated.employee_id.toString()
          )
          .subscribe((info: any) => {
            window.open(info.url);
          });
      }),
      this.queriesService.getIncomeWithholdings().subscribe(
        (data: any) => {
          this.objectReport.emit(data);
        },
        error => {
          console.log(error.error);
        }
      )
    ];
  }

  downloadFile() {
    // var blob = new Blob([data], { type: 'text/csv' });
    // var url = window.URL.createObjectURL(blob);
    // window.open(url);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
