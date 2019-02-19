import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ReportTravelsService } from '../../../../services/travel-management/report/report-travels.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../../models/general/user';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-travel-approver-report',
  templateUrl: './travel-approver-report.component.html',
  styleUrls: ['./travel-approver-report.component.css']
})
export class TravelApproverReportComponent implements OnInit {

  public title: string = 'Aprobadores';
  public is_collapse_report_approvers: boolean = false;
  public collapseFilterAdvance: boolean = false;
  public reports_list_approvers = null;
  public objectReportApprover: EventEmitter<any> = new EventEmitter();
  public id_employee: string = '-1';
  public personal_number = "";
  public ticket: string = '-1';
  public ticket_cli: string = '-1';
  public date_begin: string = '';
  public date_end: string = '';
  public approver: string = '-1';
  public level: number = -1;
  public showPdf: boolean = false;
  public showExcel: boolean = true;
  public nameReport: string = 'Aprobaciones solicitudes de viajes';
  public objectGeneralApprover: any[] = [];
  public showDataTableApprover: boolean = true;
  public btnConsultApprover: boolean = true;

  public userId: User = null;
  public countAfter: number = 0;

  constructor(public router: Router, public travel_reports_list: ReportTravelsService,
    private accionDataTableService: DataDableSharedService, public alert: AlertsService) {
    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data === 'Aprobaciones solicitudes de viajes' && this.countAfter === 0) {
        this.getObjectPrint("excel");
      }
    });
    this.reports_list_approvers = travel_reports_list.getTravelsReportList();
    document
      .getElementsByTagName("body")[0]
      .setAttribute("style", "overflow-y:auto");
  }


  ngOnInit() {
    this.getObjectPrint("general");
    this.userId = JSON.parse(localStorage.getItem("user")).employee_id;

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

  collapseReportApprovers(is_collapse: boolean) {
    this.collapseFilterAdvance = is_collapse;
    this.personal_number = '';
    this.ticket = '';
    this.ticket_cli = '';
    this.level = -1;
    this.approver = '';
    this.date_begin = '';
    this.date_end = '';

    this.getObjectPrint("general");
  }
  returnBackReportApprovers() {
    this.router.navigate(['ihr/travel_management']);
  }

  getObjectPrint(param) {

    let personal_number_send = this.personal_number === '' ? '-1' : this.personal_number;
    let ticket_send = this.ticket === '' ? '-1' : this.ticket;
    let ticket_cli_send = this.ticket_cli === '' ? '-1' : this.ticket_cli;
    let approver_send = this.approver === '' ? '-1' : this.approver;
    let date_begin_send = this.date_begin === '' ? '-1' : this.date_begin.replace('-', '').toString().replace('-', '');
    let date_end_send = this.date_end === '' ? '-1' : this.date_end.replace('-', '').toString().replace('-', '');

    if (param === 'general') {
      this.travel_reports_list.getTravelsApprovedReport(personal_number_send, ticket_send, ticket_cli_send, date_begin_send, date_end_send, approver_send, this.level).subscribe((data: any) => {
        this.objectGeneralApprover = data.data[0].data;

        if (this.objectGeneralApprover.length > 0) {
          this.objectReportApprover.emit(data);
        } else {
          this.showDataTableApprover = false;
        }
      });
      this.showDataTableApprover = true;
    } else {
      this.travel_reports_list
        .getTravelsApprovalsReportExcel(
          this.userId,
          personal_number_send,
          ticket_send,
          ticket_cli_send,
          date_begin_send,
          date_end_send,
          approver_send,
          this.level
        )
        .subscribe((data: any) => {
          window.open(data.url);
        });
    }
  }

  validateNumberApprover(name: string, value: any) {
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
      case 'approver':
        if (!proof) {
          this.approver = value.split(value[value.length - 1])[0];
        } else {
          this.approver = value;
        }
        break;
    }
  }
  validateDateAproover() {
    if ((this.date_begin === '') && (this.date_end === '')) {
      this.btnConsultApprover = true;
    } else {
      if ((this.date_begin !== '') && (this.date_end !== '')) {
        this.btnConsultApprover = true;
        let dayBegin = new Date(this.date_begin).getTime();
        let dayEnd = new Date(this.date_end).getTime();
        let calculate = ((dayEnd - dayBegin) / (1000 * 60 * 60 * 24));
        if (calculate < 0) {
          const alertWarning: Alerts[] = [{ type: 'danger', title: 'Error', message: 'La fecha inicial no puede ser mayor a la fecha final', confirmation: false }];
          this.alert.setAlert(alertWarning[0]);
          this.btnConsultApprover = false;
        }
      } else {
        const alertWarning: Alerts[] = [{ type: 'warning', title: 'Advertencia', message: 'Por favor ingrese las dos fechas para la consulta', confirmation: false }];
        this.alert.setAlert(alertWarning[0]);
        this.btnConsultApprover = false;
      }
    }

  }

  ngOnDestroy() {
    this.countAfter += 1;
  }

}
