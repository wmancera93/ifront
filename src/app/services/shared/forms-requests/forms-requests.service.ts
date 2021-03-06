import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TypesRequests } from '../../../models/common/requests-rh/requests-rh';

@Injectable()
export class FormsRequestsService {
  typeRequests: Subject<TypesRequests> = new Subject<TypesRequests>();
  restartObject: Subject<any> = new Subject<any>();

  constructor() { }

  getFormRequests() {
    return this.typeRequests;
  }

  setFormRequests(typeRequest: TypesRequests) {
    return this.typeRequests.next(typeRequest);
  }

  getRestartObject() {
    return this.restartObject;
  }

  setRestartObject(restart: any) {
    return this.restartObject.next(restart);
  }
}
