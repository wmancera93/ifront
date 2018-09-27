import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class ApproverTravelsService {

  constructor(private tokenService: Angular2TokenService) { }

  getApprovalsTravelsPending() {
    return this.tokenService.get('approvals_employee_travel_requests')
      .map((data: any) => data.json());
  }
}
