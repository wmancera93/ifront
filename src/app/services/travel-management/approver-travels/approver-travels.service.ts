import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class ApproverTravelsService {

  constructor(private tokenService: Angular2TokenService) { }

  getApprovalsTravelsPending() {
    return this.tokenService.get('approvals_employee_travel_requests')
      .map((data: any) => data.json());
  }
  getApprovalsTravelsManaged() {
    return this.tokenService.get('approvals_employee_travel_requests/managed')
      .map((data: any) => data.json());
  }
  getApprovalsRequestsById(idRequestsTravelsAproval : string) {
    return this.tokenService.get('approvals_employee_travel_requests/' + idRequestsTravelsAproval)
      .map((data: any) => data.json());
  }
  postApprovalsRequestTravel(objectApprovalsTravel: any) {
    return this.tokenService.post('approvals_employee_travel_requests/', objectApprovalsTravel)
      .map((data: any) => data.json());
  }
}
