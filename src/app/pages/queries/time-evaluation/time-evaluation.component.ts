import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { QueriesService } from '../../../services/queries/queries.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-time-evaluation',
  templateUrl: './time-evaluation.component.html',
  styleUrls: ['./time-evaluation.component.css'],
})
export class TimeEvaluationComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public token: boolean;
  public is_collapse = false;
  public allevaluationmessage: any[] = [];
  public periodi_timevaluation: Date;
  public periodf_timevaluation: Date;
  public dateBegin: string = null;
  public dateEnd: string = null;
  public condition: any[] = [];
  public arreglo = '';
  public finalDate: number;
  public showExcel = true;
  public userAuthenticated: User;
  public countAfter = 0;
  private subscriptions: ISubscription[];

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.queries.time_evaluation.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    public router: Router,
    private tokenService: Angular2TokenService,
    public alertsService: AlertsService,
    private accionDataTableService: DataDableSharedService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {

    this.subscriptions = [
      this.tokenService.validateToken().subscribe(
        () => {
          this.token = false;
        },
        error => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString(),
          });
          document
            .getElementsByTagName('body')[0]
            .setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        },
      ),
      this.accionDataTableService.getActionDataTable().subscribe(() => {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getTimeEvaluationExcel(this.userAuthenticated.employee_id.toString())
          .subscribe((excel: any) => {
            window.open(excel.url);
          });
      }),
      this.queriesService.getAllEvaluationTime().subscribe((data: any) => {
        this.objectReport.emit(data);
      }),
    ];
  }
  // getFilterMessagesByMonth() {
  //   this.queriesService.getEvaluationMessagesByMonth(this.month)
  //     .subscribe((data: any) => {
  //       this.objectReport.emit(data);
  //     });
  // }

  // getFilterMessagesByDay() {
  //   this.queriesService.getEvaluationMessagesByDay(this.day)
  //     .subscribe((data: any) => {
  //       this.objectReport.emit(data);
  //     });
  // }

  filterByperiod() {
    if (
      this.periodi_timevaluation === null &&
      this.periodf_timevaluation === null
    ) {
      this.allTimeEvaluation();
    } else {
      this.dateBegin = this.periodi_timevaluation
        .toString()
        .replace('-', '')
        .replace('-', '');
      this.dateEnd = this.periodf_timevaluation
        .toString()
        .replace('-', '')
        .replace('-', '');

      this.getFilterMessagesByPeriod();
      this.periodi_timevaluation = null;
      this.periodf_timevaluation = null;
    }
  }
  comparisonDate() {
    this.dateBegin = this.periodi_timevaluation
      .toString()
      .replace('-', '')
      .replace('-', '');
    this.dateEnd = this.periodf_timevaluation
      .toString()
      .replace('-', '')
      .replace('-', '');
    this.finalDate = parseInt(this.dateEnd) - parseInt(this.dateBegin);

    if (this.finalDate < 0) {
      const alertDataWrong: Alerts[] = [
        {
          type: 'danger',
          title: 'Error',
          message: this.t('message_alert_ts'),
          confirmation: false,
        },
      ];
      this.alertsService.setAlert(alertDataWrong[0]);
    }
  }
  allTimeEvaluation() {
    this.queriesService.getAllEvaluationTime().subscribe((data: any) => {
      this.objectReport.emit(data);
    });
  }
  getFilterMessagesByPeriod() {
    this.objectReport.emit({ success: true, data: [] });
    this.queriesService
      .getEvaluationMessagesByPeriod(this.dateBegin, this.dateEnd)
      .subscribe((data: any) => {
        this.objectReport.emit(data);
      });
  }

  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
