import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Alerts } from '../../../models/common/alerts/alerts';

@Injectable()
export class AlertsService {
  exportAlert: Subject<any> = new Subject<any>();

  constructor() { }

  getAlert() {
    return this.exportAlert;
  }

  setAlert(objectAlert: Alerts) {
    return this.exportAlert.next(objectAlert);
  }

}
