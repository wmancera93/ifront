import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-payments-deductions',
  templateUrl: './payments-deductions.component.html',
  styleUrls: ['./payments-deductions.component.css'],
})
export class PaymentsDeductionsComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public showExcel = true;
  public userAuthenticated: User;
  private subscriptions: ISubscription[];

  parseT(key) {
    return `pages.queries.payments_deductions.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
  ) {}

  ngOnInit() {
    this.subscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe(data => {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getPaymentsAndDeductionsExcel(
            this.userAuthenticated.employee_id.toString(),
          )
          .subscribe((info: any) => {
            window.open(info.url);
          });
      }),
      this.queriesService.getPaymentsDeductions().subscribe(
        (data: any) => {
          this.objectReport.emit(data);
        },
        error => {
          console.log(error.error);
        },
      ),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
