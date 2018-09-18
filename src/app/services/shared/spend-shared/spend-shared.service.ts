import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SpendSharedService {
  refreshSpend: Subject<any> = new Subject<any>();
  newSpend: Subject<any> = new Subject<any>();
  editSpend: Subject<any> = new Subject<any>();
  viewSpend: Subject<any> = new Subject<any>();
  deleteSpend: Subject<any> = new Subject<any>();
  constructor() { }

  getRefreshSpend() {
    return this.refreshSpend;
  }
  setRefreshSpend(refreshSpend: any) {
    return this.refreshSpend.next(refreshSpend);
  }

  getNewSpend() {
    return this.newSpend;
  }
  setNewSpend(newSpend: any) {
    return this.newSpend.next(newSpend);
  }
  getEditSpend() {
    return this.editSpend;
  }
  setEditSpend(editSpend: any) {
    return this.editSpend.next(editSpend);
  }
  getViewSpend() {
    return this.viewSpend;
  }
  setViewSpend(viewSpend: any) {
    return this.viewSpend.next(viewSpend);
  }
  getDeleteSpend() {
    return this.deleteSpend;
  }
  setDeleteSpend(statusDelete: any) {
    return this.deleteSpend.next(statusDelete);
  }


}
