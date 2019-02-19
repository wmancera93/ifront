import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SpendSharedService {
  refreshSpend: Subject<any> = new Subject<any>();
  newSpend: Subject<any> = new Subject<any>();
  editSpend: Subject<any> = new Subject<any>();
  viewSpend: Subject<any> = new Subject<any>();
  deleteSpend: Subject<any> = new Subject<any>();
  showDistCost: Subject<any> = new Subject<any>();
  messageSynchSpend: Subject<any> = new Subject<any>();

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
  getViewDistCostSpend() {
    return this.showDistCost;
  }
  setViewDistCostSpend(showDistCost: any) {
    return this.showDistCost.next(showDistCost);
  }
  getMessageSynchSpend() {
    return this.messageSynchSpend;
  }
  setMessageSynchSpend(messageSynchSpend: any) {
    return this.messageSynchSpend.next(messageSynchSpend);
  }

}
