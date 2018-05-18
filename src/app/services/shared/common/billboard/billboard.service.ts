import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BillboardService {
  exportUpdateNew: Subject<any> = new Subject<any>();
  exportCommentNew: Subject<any> = new Subject<any>();
  constructor() {
   }

  getUpdateNew() {
    return this.exportUpdateNew;
  }

  setUpdateNew(newPublish: any) {
    return this.exportUpdateNew.next(newPublish);
  }

  getShowCommentNew() {
    return this.exportCommentNew;
  }

  setShowCommentNew(objectNew: any) {
    return this.exportCommentNew.next(objectNew);
  }

  getRefreshEditNew() {
    return this.exportCommentNew;
  }

  setRefreshEditNew(objectEdit: any) {
    return this.exportCommentNew.next(objectEdit);
  }

}
