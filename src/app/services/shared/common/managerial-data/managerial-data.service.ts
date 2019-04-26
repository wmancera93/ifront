import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ManagerialDataService {

  dataWidgetManagerial: Subject<any> = new Subject<any>();

  constructor() { }
  getDataManagerial() {
    return this.dataWidgetManagerial;
  }

  setDataManagerial(dataManagerial: any) {
    return this.dataWidgetManagerial.next(dataManagerial);
  }
}
