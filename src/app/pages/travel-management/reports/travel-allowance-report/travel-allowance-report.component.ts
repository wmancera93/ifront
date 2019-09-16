import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReportTravelsService } from '../../../../services/travel-management/report/report-travels.service';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../../models/general/user';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-travel-allowance-report',
  templateUrl: './travel-allowance-report.component.html',
  styleUrls: ['./travel-allowance-report.component.css'],
})
export class TravelAllowanceReportComponent implements OnInit, OnDestroy {
  public title: string;
  public is_collapse_report_allowances = false;
  public reports_list_allowances = null;
  public objectReportAllowances: EventEmitter<any> = new EventEmitter();
  public id_employee = '-1';
  public personal_number = '-1';
  public ticket = '-1';
  public ticket_cli = '-1';
  public date_begin = '';
  public date_end = '';
  public legat_travel_type = '-1';
  public objectGeneralAllowances: any[] = [];
  public showPdf = false;
  public showExcel = true;
  public objectGeneralAllowance: any[] = [];
  public showDataTableAllowance = true;
  public typeTravelLegal: any[] = [];
  public btnConsultSpend = true;
  public userId: User = null;
  private subscriptions: ISubscription[] = [];

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.reports.travel_allowance_report.${key}`;
  }

  constructor(
    public router: Router,
    public travel_reports_list: ReportTravelsService,
    public travelManagementService: TravelService,
    private accionDataTableService: DataDableSharedService,
    public alert: AlertsService,
    public translate: TranslateService,
  ) {
    this.subscriptions = [
      this.accionDataTableService
        .getActionDataTable()
        .subscribe((data: any) => {
          this.getObjectPrint('excel');
        }),
    ];
    this.reports_list_allowances = travel_reports_list.getTravelsReportList();
    document
      .getElementsByTagName('body')[0]
      .setAttribute('style', 'overflow-y:auto');
  }

  ngOnInit() {
    this.getObjectPrint('general');
    this.subscriptions = [
      ...this.subscriptions,
      this.travelManagementService
        .getplanningTravelRequests()
        .subscribe((data: any) => {
          this.typeTravelLegal = this.sortByAphabet(
            data.data.legal_travels_types,
          );
        }),
    ];

    this.userId = JSON.parse(localStorage.getItem('user')).employee_id;
  }

  sortByAphabet(dataBySort: any) {
    dataBySort.sort(function(a, b) {
      const nameA: String = a.name.toLowerCase();
      const nameB: String = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    });

    return dataBySort;
  }

  selectTypeReport(array: any) {
    this.router.navigate(['ihr/' + array.code]);
  }

  collapseReportAllowances(is_collapse: boolean) {
    this.is_collapse_report_allowances = is_collapse;

    this.personal_number = '';
    this.ticket = '';
    this.ticket_cli = '';
    this.date_begin = '';
    this.date_end = '';
    this.legat_travel_type = '-1';
    this.getObjectPrint('general');
  }

  returnBackReportAllowances() {
    this.router.navigate(['ihr/travel_management/index']);
  }
  getObjectPrint(param) {
    const personal_number_send =
      this.personal_number === '' ? '-1' : this.personal_number;
    const ticket_send = this.ticket === '' ? '-1' : this.ticket;
    const ticket_cli_send = this.ticket_cli === '' ? '-1' : this.ticket_cli;
    const date_begin_send =
      this.date_begin === ''
        ? '-1'
        : this.date_begin
            .replace('-', '')
            .toString()
            .replace('-', '');
    const date_end_send =
      this.date_end === ''
        ? '-1'
        : this.date_end
            .replace('-', '')
            .toString()
            .replace('-', '');

    if (param === 'general') {
      this.subscriptions = [
        ...this.subscriptions,
        this.travel_reports_list
          .getTravelsAllowanceReport(
            personal_number_send,
            ticket_send,
            ticket_cli_send,
            date_begin_send,
            date_end_send,
            this.legat_travel_type,
          )
          .subscribe((data: any) => {
            this.objectGeneralAllowances = data.data[0].data;
            if (this.objectGeneralAllowances.length > 0) {
              this.objectReportAllowances.emit(data);
            } else {
              this.showDataTableAllowance = false;
            }
          }),
      ];
      this.showDataTableAllowance = true;
    } else {
      this.subscriptions = [
        ...this.subscriptions,
        this.travel_reports_list
          .getTravelsAllowanceReportExcel(
            this.userId,
            personal_number_send,
            ticket_send,
            ticket_cli_send,
            date_begin_send,
            date_end_send,
            this.legat_travel_type,
          )
          .subscribe((data: any) => {
            window.open(data.url);
          }),
      ];
    }
  }

  validateNumberSpend(name: string, value: any) {
    const proof = /^[0-9]+$/.test(value);
    switch (name) {
      case 'personal_number':
        if (!proof) {
          this.personal_number = value.split(value[value.length - 1])[0];
        } else {
          this.personal_number = value;
        }
        break;
      case 'ticket':
        if (!proof) {
          this.ticket = value.split(value[value.length - 1])[0];
        } else {
          this.ticket = value;
        }
        break;
      case 'ticket_cli':
        if (!proof) {
          this.ticket_cli = value.split(value[value.length - 1])[0];
        } else {
          this.ticket_cli = value;
        }
        break;
    }
  }
  validateDateAllowance() {
    if (this.date_begin === '' && this.date_end === '') {
      this.btnConsultSpend = true;
    } else {
      if (this.date_begin !== '' && this.date_end !== '') {
        this.btnConsultSpend = true;
        const dayBegin = new Date(this.date_begin).getTime();
        const dayEnd = new Date(this.date_end).getTime();
        const calculate = (dayEnd - dayBegin) / (1000 * 60 * 60 * 24);
        if (calculate < 0) {
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: 'Error',
              message: this.t('message_alert_one_ts'),
              confirmation: false,
            },
          ];
          this.alert.setAlert(alertWarning[0]);
          this.btnConsultSpend = false;
        }
      } else {
        const alertWarning: Alerts[] = [
          {
            type: 'warning',
            title: this.t('type_alert_ts'),
            message: this.t('message_alert_two_ts'),
            confirmation: false,
          },
        ];
        this.alert.setAlert(alertWarning[0]);
        this.btnConsultSpend = false;
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
