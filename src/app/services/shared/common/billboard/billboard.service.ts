import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BillboardService {
  exportUpdateNew: Subject<any> = new Subject<any>();  
  constructor() { }

  getUpdateNew()
  {  
    return this.exportUpdateNew;
  }

  setUpdateNew(newPublish:any)
  {    
    return this.exportUpdateNew.next(newPublish);    
  }

}
