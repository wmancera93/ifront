import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PrintDataTableService {
  exportObjectForPrint: Subject<any> = new Subject<any>();

  constructor() { }

  getObjectForPrint() {
    return this.exportObjectForPrint;
  }

  setObjectForPrint(objectForPrint: any) {
    return this.exportObjectForPrint.next(objectForPrint);
  }
}
