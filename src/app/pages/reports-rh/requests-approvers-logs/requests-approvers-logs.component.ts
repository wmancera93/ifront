import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ReportsHrService } from '../../../services/reports-rh/reports-hr.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';

@Component({
  selector: 'app-requests-approvers-logs',
  templateUrl: './requests-approvers-logs.component.html',
  styleUrls: ['./requests-approvers-logs.component.css'],
})
export class RequestsApproversLogsComponent implements OnInit, OnDestroy {
  token;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport = '';
  public personal_number = '';
  public type_selected = '';
  public type_requests = '-1';
  public newtype_requests: any[] = [];

  public request_number = '';
  public personal_request_number = '';
  public personal_approver_number = '';
  public date_begin = '';
  public date_end = '';
  public is_collapse = false;

  public btnConsult = true;
  public showExcel = true;
  private subscriptions: ISubscription[] = [];
  private steps = ['step_1', 'step_2', 'step_3', 'data_table_step_1', 'data_table_step_2', 'data_table_step_3'];
  public userId: User = null;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.reports_rh.requests_approvers_log.${key}`;
  }

  constructor(
    public reportsHrService: ReportsHrService,
    private accionDataTableService: DataDableSharedService,
    public alert: AlertsService,
    public translate: TranslateService,
    public joyrideAppService: JoyrideAppService,
  ) {
    this.type_selected = this.t('option_select');
    this.subscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
        this.getReportExcel();
      }),
      this.joyrideAppService.onStartTour.subscribe(() => {
        this.subscriptions.push(this.joyrideAppService.startTour({ steps: this.steps }));
      }),
    ];
  }

  ngOnInit() {
    $('#collapseExample')
      .on('hidden.bs.collapse', () => {
        this.is_collapse = true;
      })
      .on('shown.bs.collapse', () => {
        this.is_collapse = false;
      });
    this.userId = JSON.parse(localStorage.getItem('user'));

    this.reportsHrService.getSelectRequestsByType().subscribe((data: any) => {
      this.newtype_requests = data.data;
    });

    this.getReport();
  }

  filterRequests(value: string, name: string) {
    this.type_requests = value;
    this.type_selected = name;
  }

  getReport() {
    this.objectReport.emit({ succes: true, data: [] });
    const objectParamsSend = {
      request_number: this.request_number === '' ? '-1' : this.request_number,
      type_requests: this.type_requests === '' ? '-1' : this.type_requests,
      personal_request_number: this.personal_request_number === '' ? '-1' : this.personal_request_number,
      personal_approver_number: this.personal_approver_number === '' ? '-1' : this.personal_approver_number,
      date_begin: this.date_begin === '' ? '-1' : this.date_begin,
      date_end: this.date_end === '' ? '-1' : this.date_end,
    };
    this.subscriptions = [
      ...this.subscriptions,
      this.reportsHrService
        .getRequestsLogsApprovers(
          objectParamsSend.request_number,
          objectParamsSend.type_requests,
          objectParamsSend.personal_request_number,
          objectParamsSend.personal_approver_number,
          objectParamsSend.date_begin,
          objectParamsSend.date_end,
        )
        .subscribe((data: any) => {
          this.objectReport.emit(data);
        }),
    ];
  }

  getReportExcel() {
    const objectParamsSend = {
      request_number: this.request_number === '' ? '-1' : this.request_number,
      type_requests: this.type_requests === '' ? '-1' : this.type_requests,
      personal_request_number: this.personal_request_number === '' ? '-1' : this.personal_request_number,
      personal_approver_number: this.personal_approver_number === '' ? '-1' : this.personal_approver_number,
      date_begin: this.date_begin === '' ? '-1' : this.date_begin,
      date_end: this.date_end === '' ? '-1' : this.date_end,
    };
    this.subscriptions = [
      ...this.subscriptions,
      this.reportsHrService
        .getRequestsLogsApproversExcel(
          this.userId.employee_id,
          objectParamsSend.request_number,
          objectParamsSend.type_requests,
          objectParamsSend.personal_request_number,
          objectParamsSend.personal_approver_number,
          objectParamsSend.date_begin,
          objectParamsSend.date_end,
        )
        .subscribe((data: any) => {
          window.open(data.url);
        }),
    ];
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
    $('#collapseExample').collapse(is_collapse ? 'show' : 'hide');
  }
  getObjectPrint() {
    this.getReport();
  }

  validateNumber(name: string, value: any) {
    const proof = /^[0-9]+$/.test(value);
    switch (name) {
      case 'request_number':
        if (!proof) {
          this.request_number = value.split(value[value.length - 1])[0];
        } else {
          this.request_number = value;
        }
        break;
      case 'personal_request_number':
        if (!proof) {
          this.personal_request_number = value.split(value[value.length - 1])[0];
        } else {
          this.personal_request_number = value;
        }
        break;
      case 'personal_approver_number':
        if (!proof) {
          this.personal_approver_number = value.split(value[value.length - 1])[0];
        } else {
          this.personal_approver_number = value;
        }
        break;
    }
  }
  validateDate() {
    if (this.date_begin === '' && this.date_end === '') {
      this.btnConsult = true;
    } else {
      if (this.date_begin !== '' && this.date_end !== '') {
        this.btnConsult = true;
        const dayBegin = new Date(this.date_begin).getTime();
        const dayEnd = new Date(this.date_end).getTime();
        const calculate = (dayEnd - dayBegin) / (1000 * 60 * 60 * 24);
        if (calculate < 0) {
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: 'Error',
              message: this.t('message_ts_one'),
              confirmation: false,
            },
          ];
          this.alert.setAlert(alertWarning[0]);
          this.btnConsult = true;
          this.date_begin = '';
          this.date_end = '';
        }
      } else {
        const alertWarning: Alerts[] = [
          {
            type: 'warning',
            title: this.t('message_ts_tree'),
            message: this.t('message_ts_two'),
            confirmation: false,
          },
        ];
        this.alert.setAlert(alertWarning[0]);
        this.btnConsult = false;
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
