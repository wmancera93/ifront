import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-compnsated-vacations',
  templateUrl: './compnsated-vacations.component.html',
  styleUrls: ['./compnsated-vacations.component.css'],
})
export class CompnsatedVacationsComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public showExcel = true;
  public userAuthenticated: User;
  private subscriptions: ISubscription[];

  parseT(key) {
    return `pages.queries.compnsated_vacations.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
  ) {}

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth',
    });
    this.subscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe(() => {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getCompensatedVacationExcel(
            this.userAuthenticated.employee_id.toString(),
          )
          .subscribe((info: any) => {
            window.open(info.url);
          });
      }),
      this.queriesService.getCompensatedVacations().subscribe(
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
