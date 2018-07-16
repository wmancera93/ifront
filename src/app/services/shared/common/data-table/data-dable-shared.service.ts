import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataDableSharedService {
  objectDataTableAction: Subject<any> = new Subject<any>();

  constructor() { }
  getActionDataTable() {
    return this.objectDataTableAction;
  }

  setActionDataTable(accionDataTable: any) {
    return this.objectDataTableAction.next(accionDataTable);
  }
}
