import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AdvanceSharedService {

  newAdvance: Subject<any> = new Subject<any>();
  viewAdvance: Subject<any> = new Subject<any>();
  editAdvance: Subject<any> = new Subject<any>();  
  refreshAdvance: Subject<any> = new Subject<any>();
  

  constructor() { }

  getNewAdvance() {
    return this.newAdvance;
  }
  setNewAdvance(newAdvance:any ) {
    return this.newAdvance.next(newAdvance);
  } 
  getEditAdvance() {
    return this.editAdvance;
  }
  setEditAdvance(editAdvance:any ) {
    return this.editAdvance.next(editAdvance);
  }
  getViewAdvance() {
    return this.viewAdvance;
  }
  setViewAdvance(viewAdvance:any ) {
    return this.viewAdvance.next(viewAdvance);
  } 

  getRefreshAdvanceList() {
    return this.refreshAdvance;
  }
  setRefreshAdvanceList(refreshAdvanceList:any ) {
    return this.refreshAdvance.next(refreshAdvanceList);
  } 
}
