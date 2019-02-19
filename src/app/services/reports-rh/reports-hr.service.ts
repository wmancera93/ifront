import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class ReportsHrService {

  constructor(public http: HttpClient,
    private tokenService: Angular2TokenService) { }

  getReportEmployeeRoles() {
    return this.tokenService.get('hr_reports/employee_roles')
      .map((data: any) => data.json());
  }

  getReportEmployeeRolesByStatus(status: string) {
    return this.tokenService.get('hr_reports/employee_roles/' + status)
      .map((data: any) => data.json());
  }

  getRequestsAll() {
    return this.tokenService.get('hr_reports/requests')
      .map((data: any) => data.json());
  }

  getRequestsByStatus(status: string) {
    return this.tokenService.get('hr_reports/requests/' + status)
      .map((data: any) => data.json());
  }

  getRequestsExcelByStatus(status: any) {
    return this.tokenService.get('hr_reports/requests_employee_report/' + status)
      .map((data: any) => data.json());
  }
  getRequestsApprovers(type: string, approver: string, platform: string) {
    return this.tokenService.get('hr_reports/consultation_approvers_filter/' + type + '/' + approver + '/' + platform)
      .map((data: any) => data.json());
  }
  getSelectRequestsByType() {
    return this.tokenService.get('employee_requets/select_activities')
      .map((data: any) => data.json());
  }

  getRequestsLogsApprovers(request_employee_id: string, type_request: string, applicant_pernr: string, approver_pernr: string, start_date: string, end_date: string) {
    return this.tokenService.get('answer_request/answer_request_report/' + request_employee_id + '/' + type_request + '/' + applicant_pernr + '/' + approver_pernr + '/' + start_date + '/' + end_date)
      .map((data: any) => data.json());
  }
  getRequestsLogsApproversExcel(employee_id: number, request_employee_id: string, type_request: string, applicant_pernr: string, approver_pernr: string, start_date: string, end_date: string) {
    return this.tokenService.get('answer_request/answer_request_report_export/' + employee_id + '/' + request_employee_id + '/' + type_request + '/' + applicant_pernr + '/' + approver_pernr + '/' + start_date + '/' + end_date)
      .map((data: any) => data);
  }
}


