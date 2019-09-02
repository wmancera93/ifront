import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-vacation-enjoyed',
  templateUrl: './vacation-enjoyed.component.html',
  styleUrls: ['./vacation-enjoyed.component.css'],
})
export class VacationEnjoyedComponent implements OnInit, OnDestroy {
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
    return `pages.queries.vacation_enjoyed.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
  ) {}

  ngOnInit() {

    this.subscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe(() => {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getEnjoyedVacationExcel(
            this.userAuthenticated.employee_id.toString(),
          )
          .subscribe((info: any) => {
            window.open(info.url);
          });
      }),
      this.queriesService.getVacationEnjoyed().subscribe(
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
