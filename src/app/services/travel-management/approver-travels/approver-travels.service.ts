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
  getApprovalsSpendPending() {
    return this.tokenService.get('approvals_employee_allowance_requests')
      .map((data: any) => data.json());
  }
  getApprovalsAdvancePending() {
    return this.tokenService.get('approvals_employee_travel_advance_requests')
      .map((data: any) => data.json());
  }
  getApprovalsSpendManaged() {
    return this.tokenService.get('approvals_employee_allowance_requests/managed')
      .map((data: any) => data.json());
  }
  getApprovalsAdvanceManaged() {
    return this.tokenService.get('approvals_employee_travel_advance_requests/managed')
      .map((data: any) => data.json());
  }
  getApprovalsRequestsById(idRequestsTravelsAproval : string) {
    return this.tokenService.get('approvals_employee_travel_requests/' + idRequestsTravelsAproval)
      .map((data: any) => data.json());
  }
  getApprovalsRequestsSpendById(idRequestsSpendAproval : string) {
    return this.tokenService.get('approvals_employee_allowance_requests/' + idRequestsSpendAproval)
      .map((data: any) => data.json());
  }
  getApprovalsRequestsAdnvanceById(idRequestsAdvancedAproval : string) {
    return this.tokenService.get('approvals_employee_travel_advance_requests/' + idRequestsAdvancedAproval)
      .map((data: any) => data.json());
  }
  postApprovalsRequestTravel(objectApprovalsTravel: any) {
    return this.tokenService.post('approvals_employee_travel_requests/', objectApprovalsTravel)
      .map((data: any) => data.json());
  }
  postApprovalsRequestSpend(objectApprovalsSpend: any) {
    return this.tokenService.post('approvals_employee_allowance_requests/', objectApprovalsSpend)
      .map((data: any) => data.json());
  }
  postApprovalsRequestAdvance(objectApprovalsAdvance: any) {
    return this.tokenService.post('approvals_employee_travel_advance_requests/', objectApprovalsAdvance)
      .map((data: any) => data.json());
  }
}
