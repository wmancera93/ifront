import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TravelApproverService {

  viewDetailRequest: Subject<any> = new Subject<any>();
  refreshListIndex: Subject<any> = new Subject<any>();
  type_request: Subject<any> = new Subject<any>();
  
  constructor() { }

  getviewDetailRequests() {
    return this.viewDetailRequest;
  }

  setviewDetailRequests(viewDetailRequest:any , type_request:string) {
    return this.viewDetailRequest.next(viewDetailRequest);
  }
  getrefreshIndexRequest() {
    return this.refreshListIndex;
  }

  setrefreshIndexRequest(refreshListIndex:any ) {
    return this.refreshListIndex.next(refreshListIndex);
  }

}
