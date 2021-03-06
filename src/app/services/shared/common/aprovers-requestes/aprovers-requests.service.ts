import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ListRequests } from '../../../../models/common/requests-rh/requests-rh';

@Injectable()
export class AproversRequestsService {
  requests: Subject<any> = new Subject<any>();
  approvalsRequests: Subject<any> = new Subject<any>();
  confirmApproval: Subject<any> = new Subject<any>();

  constructor() { }

  getRequests() {
    return this.requests;
  }

  setRequests(objectRequests: any) {
    return this.requests.next(objectRequests);
  }

  getAprovalsRequests() {
    return this.approvalsRequests;
  }

  setAprovalsRequests(objectRequest: any) {
    return this.approvalsRequests.next(objectRequest);
  }

  getConfirmApproval() {
    return this.confirmApproval;
  }

  setConfirmApproval(confirm: any) {
    return this.confirmApproval.next(confirm);
  }
}
