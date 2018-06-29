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
  getExcelRequestsByStatus(status: string) {
    return this.tokenService.get('hr_reports/requests_export_file/' + status + '.xls')
      .map((data: any) => data.json());
  }
  getRequestsApprovers(type: string, approver:string, platform:string) {
    return this.tokenService.get('hr_reports/consultation_approvers_filter/'+ type + '/' + approver + '/' + platform)
      .map((data: any) => data.json());
  }
  getSelectRequestsByType() {
    return this.tokenService.get('employee_requets/select_activities')
      .map((data: any) => data.json());
  }
}
  

