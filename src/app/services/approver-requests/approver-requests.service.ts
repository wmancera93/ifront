import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApproverRequestsService {

  constructor(private http: HttpClient) { }

  getApprovalsRequestsPending() {
    return this.http.get(environment.apiBaseHr + '/api/v2/approvals_employee_requests')
      .map((data: Observable<any>) => data);
  }

  getApprovalsRequestsManaged() {
    return this.http.get(environment.apiBaseHr + '/api/v2/approvals_employee_requests/managed')
      .map((data: Observable<any>) => data);
  }

  getDetailApprovalsRequests(ticket: number) {
    return this.http.get(environment.apiBaseHr + '/api/v2/approvals_employee_requests/' + ticket)
      .map((data: Observable<any>) => data);
  }

  postApprovalsRequest(objectApprovals: any) {
    return this.http.post(environment.apiBaseHr + '/api/v2/employee_requets/', objectApprovals)
      .map((data: Observable<any>) => data);
  }
  
}
