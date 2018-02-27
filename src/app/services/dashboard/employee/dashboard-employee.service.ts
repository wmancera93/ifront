import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardEmployeeService {

  constructor(public http: HttpClient) { }

  getNewspaper() {
    return this.http.get(environment.apiBaseHr + '/api/v2/billboards')
      .map((data: Observable<any>) => data);
  }

  getEventsEmployee() {
    return this.http.get(environment.apiBaseHr + '/api/v2/dashboards/events_employees')
      .map((data: Observable<any>) => data);
  }

  getRequest(){
    return this.http.get(environment.apiBaseHr + '/api/v2/dashboards/total_requests_widget')
      .map((data: Observable<any>) => data);
  }

  getVacations(){
    return this.http.get(environment.apiBaseHr + '/api/v2/dashboards/total_days_vacations_widget')
      .map((data: Observable<any>) => data);
  }

}
