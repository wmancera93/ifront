import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportsHrService {

  constructor(public http: HttpClient) { }

  getReportEmployeeRoles() {
    return this.http.get(environment.apiBaseHr + '/api/v2/hr_reports/employee_roles')
      .map((data: Observable<any>) => data);
  }

  getReportEmployeeRolesByStatus(status: string) {
    return this.http.get(environment.apiBaseHr + '/api/v2/hr_reports/show_employee_roles/' + status)
      .map((data: Observable<any>) => data);
  }
}
