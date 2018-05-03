import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class DashboardEmployeeService {

  constructor(public http: HttpClient,
    private tokenService: Angular2TokenService) {

  }

  getNewspaper() {
    return this.tokenService.get('dashboards/aticles_widget')
      .map((data) => data.json());
  }

  getEventsEmployee() {
    return this.tokenService.get('dashboards/events_employees_widget')
      .map((data: any) => data.json());
  }

  getRequest() {
    return this.tokenService.get('dashboards/total_requests_widget')
      .map((data: any) => data.json());
  }

  getVacations() {
    return this.tokenService.get('dashboards/total_days_vacations_widget')
      .map((data: any) => data.json());
  }
  getCalendar() {
    return this.tokenService.get('dashboards/calendar_time_widget')
      .map((data: any) => data.json());
  }

  getSeverancesData() {
    return this.tokenService.get('dashboards/my_severances_widget')
      .map((data: any) => data.json());
  }
  getIncomesData() {
    return this.tokenService.get('dashboards/total_incomes_deductions_widget')
      .map((data: any) => data.json());
  }

}
