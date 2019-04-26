import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ReportTravelsService {
  public report_travels_list: any;

  parseT(key) {
    return `services.travel_management.report.${key}`;
  }

  constructor(
    private tokenService: Angular2TokenService,
    public translate: TranslateService,
  ) {
    this.report_travels_list = [
      {
        id: 1,
        name: this.parseT('name_travel'),
        code: 'travel_report',
      },
      {
        id: 2,
        name: this.parseT('name_advance'),
        code: 'advance_report',
      },
      {
        id: 3,
        name: this.parseT('mane_allowance'),
        code: 'allowance_report',
      },
      {
        id: 4,
        name: this.parseT('name_approver'),
        code: 'approver_report',
      },
    ];
  }

  getTravelsRequestsReport(
    id_employee: any,
    ticket: any,
    ticket_cli: any,
    travel_cost: any,
    date_begin: any,
    date_end: any,
    legal_travel: any,
  ) {
    return this.tokenService
      .get(
        'travel_reports/travel_request_report/' +
          id_employee +
          '/' +
          ticket +
          '/' +
          ticket_cli +
          '/' +
          travel_cost +
          '/' +
          date_begin +
          '/' +
          date_end +
          '/' +
          legal_travel,
      )
      .map((data: any) => data.json());
  }
  getTravelsAdvanceReport(
    id_employee: any,
    ticket: any,
    ticket_cli: any,
    date_begin: any,
    date_end: any,
  ) {
    return this.tokenService
      .get(
        'travel_reports/travel_advance_report/' +
          id_employee +
          '/' +
          ticket +
          '/' +
          ticket_cli +
          '/' +
          date_begin +
          '/' +
          date_end,
      )
      .map((data: any) => data.json());
  }
  getTravelsAllowanceReport(
    id_employee: any,
    ticket: any,
    ticket_cli: any,
    date_begin: any,
    date_end: any,
    legal_travel: any,
  ) {
    return this.tokenService
      .get(
        'travel_reports/travel_expenses_report/' +
          id_employee +
          '/' +
          ticket +
          '/' +
          ticket_cli +
          '/' +
          date_begin +
          '/' +
          date_end +
          '/' +
          legal_travel,
      )
      .map((data: any) => data.json());
  }
  getTravelsApprovedReport(
    id_employee: any,
    ticket: any,
    ticket_cli: any,
    date_begin: any,
    date_end: any,
    approver: any,
    level: any,
  ) {
    return this.tokenService
      .get(
        'travel_reports/travel_aprovals_report/' +
          id_employee +
          '/' +
          ticket +
          '/' +
          ticket_cli +
          '/' +
          date_begin +
          '/' +
          date_end +
          '/' +
          approver +
          '/' +
          level,
      )
      .map((data: any) => data.json());
  }

  getTravelsReportList() {
    return this.report_travels_list;
  }

  getTravelsRequestsReportExcel(
    id_employee: any,
    personal_number: any,
    ticket: any,
    ticket_cli: any,
    travel_cost: any,
    date_begin: any,
    date_end: any,
    legal_travel: any,
  ) {
    return this.tokenService
      .get(
        'travel_reports/travel_request_report_export/' +
          id_employee +
          '/' +
          personal_number +
          '/' +
          ticket +
          '/' +
          ticket_cli +
          '/' +
          travel_cost +
          '/' +
          date_begin +
          '/' +
          date_end +
          '/' +
          legal_travel,
      )
      .map((data: any) => data);
  }
  getTravelsAllowanceReportExcel(
    id_employee: any,
    personal_number: any,
    ticket: any,
    ticket_cli: any,
    date_begin: any,
    date_end: any,
    legal_travel: any,
  ) {
    return this.tokenService
      .get(
        'travel_reports/travel_expenses_report_export/' +
          id_employee +
          '/' +
          personal_number +
          '/' +
          ticket +
          '/' +
          ticket_cli +
          '/' +
          date_begin +
          '/' +
          date_end +
          '/' +
          legal_travel,
      )
      .map(data => data);
  }
  getTravelsAdvanceReportExcel(
    id_employee: any,
    personal_number: any,
    ticket: any,
    ticket_cli: any,
    date_begin: any,
    date_end: any,
  ) {
    return this.tokenService
      .get(
        'travel_reports/travel_advance_report_export/' +
          id_employee +
          '/' +
          personal_number +
          '/' +
          ticket +
          '/' +
          ticket_cli +
          '/' +
          date_begin +
          '/' +
          date_end,
      )
      .map(data => data);
  }
  getTravelsApprovalsReportExcel(
    id_employee: any,
    personal_number: any,
    ticket: any,
    ticket_cli: any,
    date_begin: any,
    date_end: any,
    approver: any,
    level: any,
  ) {
    return this.tokenService
      .get(
        'travel_reports/travel_approvals_report_export/' +
          id_employee +
          '/' +
          personal_number +
          '/' +
          ticket +
          '/' +
          ticket_cli +
          '/' +
          date_begin +
          '/' +
          date_end +
          '/' +
          approver +
          '/' +
          level,
      )
      .map(data => data);
  }
}
