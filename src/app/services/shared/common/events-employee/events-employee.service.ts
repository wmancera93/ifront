import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventsEmployeeService {

  infoEventEmployee: Subject<any> = new Subject<any>();
  refreshEvent: Subject<any> = new Subject<any>();

  constructor() { }

  getInfoEventEmployee() {
    return this.infoEventEmployee;
  }

  setInfoEventEmployee(infoEmployee: any) {
    return this.infoEventEmployee.next(infoEmployee);
  }

  getRefreshEventEmployee() {
    return this.refreshEvent;
  }

  setRefreshEventEmployee(refreshEvent: any) {
    return this.refreshEvent.next(refreshEvent);
  }
}
