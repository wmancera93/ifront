import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class ApproverRequestsService {

  constructor(private http: HttpClient,
    private tokenService: Angular2TokenService) { }

  getApprovalsRequestsPending() {
    return this.tokenService.get('approvals_employee_requests')
      .map((data: any) => data.json());
  }

  getApprovalsRequestsManaged() {
    return this.tokenService.get('approvals_employee_requests/managed')
      .map((data: any) => data.json());
  }

  getDetailApprovalsRequests(ticket: number) {
    return this.tokenService.get('approvals_employee_requests/' + ticket)
      .map((data: any) => data.json());
  }

  postApprovalsRequest(objectApprovals: any) {
    return this.tokenService.post('approvals_employee_requests/', objectApprovals)
      .map((data: any) => data.json());
  }

}
