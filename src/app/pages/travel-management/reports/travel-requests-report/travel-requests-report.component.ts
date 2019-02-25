import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ReportTravelsService } from '../../../../services/travel-management/report/report-travels.service';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { User } from '../../../../models/general/user';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-travel-requests-report',
  templateUrl: './travel-requests-report.component.html',
  styleUrls: ['./travel-requests-report.component.css']
})
export class TravelRequestsReportComponent implements OnInit {

  public objectReportTravel: EventEmitter<any> = new EventEmitter();
  public title: string;
  public is_collapse_report_travel: boolean = false;
  public reports_list = null;
  public personal_number: string = '';
  public ticket: string = '';
  public ticket_cli: string = '';
  public travel_cost: string = '-1';
  public date_begin: string = '';
  public date_end: string = '';
  public legat_travel_type: string = '-1';
  public showPdf: boolean = false;
  public showExcel: boolean = true;
  public nameReport: string;
  public objectGeneralTravel: any[] = [];
  public showDataTable: boolean = true;
  public typeTravelLegal: any[] = [];
  public type_element_imputation: any[] = [];
  public userId: User = null;
  public countAfter: number = 0;
  public btnConsult: boolean = true;
  public translate: Translate = null;


  constructor(public router: Router, public travel_reports_list: ReportTravelsService,
    public travelManagementService: TravelService, private accionDataTableService: DataDableSharedService,
    public alert: AlertsService, public translateService: TranslateService) {
    debugger
    this.translate = this.translateService.getTranslate();
    this.title = this.translate.app.frontEnd.pages.travel_management.reports.travel_request_report.tittle_ts;
    console.log(this.title);
    this.nameReport = this.translate.app.frontEnd.pages.travel_management.reports.travel_request_report.name_table_ts;

    this.accionDataTableService.getActionDataTable().subscribe((data) => {

      if (data === this.nameReport && this.countAfter === 0) {
        this.getObjectPrint('excel')
      }
    });

    this.reports_list = travel_reports_list.getTravelsReportList();
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:auto');

  }

  ngOnInit() {
    this.getObjectPrint('general');
    this.travelManagementService.getplanningTravelRequests().
      subscribe((data: any) => {
        this.typeTravelLegal = this.sortByAphabet(data.data.legal_travels_types);
        this.type_element_imputation = this.sortByAphabet(data.data.travel_costs_types);

      })

    this.userId = JSON.parse(localStorage.getItem("user")).employee_id
  }
  sortByAphabet(dataBySort: any) {
    dataBySort.sort(function (a, b) {
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

  collapseReportTravel(is_collapse: boolean) {
    this.is_collapse_report_travel = is_collapse;
    this.personal_number = '';
    this.ticket = '';
    this.ticket_cli = '';
    this.travel_cost = '-1';
    this.date_begin = '';
    this.date_end = '';
    this.legat_travel_type = '-1';
    this.getObjectPrint('general');

  }
  returnBackReportTravel() {
    this.router.navigate(['ihr/travel_management']);
  }

  getObjectPrint(param) {

    let personal_number_send = this.personal_number === '' ? '-1' : this.personal_number;
    let ticket_send = this.ticket === '' ? '-1' : this.ticket;
    let ticket_cli_send = this.ticket_cli === '' ? '-1' : this.ticket_cli;
    let date_begin_send = this.date_begin === '' ? '-1' : this.date_begin.replace('-', '').toString().replace('-', '');
    let date_end_send = this.date_end === '' ? '-1' : this.date_end.replace('-', '').toString().replace('-', '');
    if (param === 'general') {
      this.travel_reports_list.getTravelsRequestsReport(personal_number_send, ticket_send, ticket_cli_send, this.travel_cost, date_begin_send,
        date_end_send, this.legat_travel_type).subscribe((data: any) => {
          this.objectGeneralTravel = data.data[0].data;
          if (this.objectGeneralTravel.length > 0) {
            this.objectReportTravel.emit(data);
          } else {
            this.showDataTable = false;
          }
        })
      this.showDataTable = true;
    } else {
      this.travel_reports_list.getTravelsRequestsReportExcel(this.userId, personal_number_send, ticket_send, ticket_cli_send, this.travel_cost, date_begin_send,
        date_end_send, this.legat_travel_type).subscribe((data: any) => {
          window.open(data.url);
        });
    }
  }
  validateNumber(name: string, value: any) {
    let proof = /^[0-9]+$/.test(value);
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

  validateDate() {
    if ((this.date_begin === '') && (this.date_end === '')) {
      this.btnConsult = true;
    } else {
      if ((this.date_begin !== '') && (this.date_end !== '')) {
        this.btnConsult = true;
        let dayBegin = new Date(this.date_begin).getTime();
        let dayEnd = new Date(this.date_end).getTime();
        let calculate = ((dayEnd - dayBegin) / (1000 * 60 * 60 * 24));
        if (calculate < 0) {
          const alertWarning: Alerts[] = [{ type: 'danger', title: 'Error', message: this.translate.app.frontEnd.pages.travel_management.reports.travel_request_report.message_alert_one_ts, confirmation: false }];
          this.alert.setAlert(alertWarning[0]);
          this.btnConsult = false;
        }
      } else {
        const alertWarning: Alerts[] = [{ type: 'warning', title: this.translate.app.frontEnd.pages.travel_management.reports.travel_request_report.type_alert_ts, message: this.translate.app.frontEnd.pages.travel_management.reports.travel_request_report.message_alert_two_ts, confirmation: false }];
        this.alert.setAlert(alertWarning[0]);
        this.btnConsult = false;
      }
    }

  }

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
