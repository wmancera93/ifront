import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class DashboardEmployeeService {

  constructor(public http: HttpClient,
    private tokenService: Angular2TokenService ) {
     
     }

  getNewspaper() {
    return this.tokenService.get('dashboards/billboards')
      .map((data: any) => data);
  }

  getEventsEmployee() {
    return this.tokenService.get('dashboards/events_employees')
      .map((data: any) => data);
  }

  getRequest() {
    return this.tokenService.get('dashboards/total_requests_widget')
      .map((data: any) => data);
  }

  getVacations() {
    return this.tokenService.get('dashboards/total_days_vacations_widget')
      .map((data: any) => data);
  }
  getCalendar() {
    return this.tokenService.get('dashboards/calendar_time_widget')
      .map((data: any) => data);
  }

  getSeverancesData() {
    return this.tokenService.get('dashboards/my_severances_widget')
      .map((data: any) => data);
  }
  getIncomesData() {
    return this.tokenService.get('dashboards/total_incomes_deductions')
      .map((data: any) => data);
  }

}
