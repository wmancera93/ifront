import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public showExcel = true;
  public userAuthenticated: User;
  private subscriptions: ISubscription[];
  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.queries.loans.${key}`;
  }
  constructor(
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth',
    });

    this.subscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe(data => {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getLoansExcel(this.userAuthenticated.employee_id.toString())
          .subscribe((info: any) => {
            window.open(info.url);
          });
      }),
      this.queriesService.getLoans().subscribe(
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
