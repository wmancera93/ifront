import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TravelApproverService {

  viewDetailRequest: Subject<any> = new Subject<any>();
  refreshListIndex: Subject<any> = new Subject<any>();
  
  constructor() { }

  getviewDetailRequests() {
    return this.viewDetailRequest;
  }

  setviewDetailRequests(viewDetailRequest:any ) {
    return this.viewDetailRequest.next(viewDetailRequest);
  }
  getrefreshIndexRequest() {
    return this.refreshListIndex;
  }

  setrefreshIndexRequest(refreshListIndex:any ) {
    return this.refreshListIndex.next(refreshListIndex);
  }

}
