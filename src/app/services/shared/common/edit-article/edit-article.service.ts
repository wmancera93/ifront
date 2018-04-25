import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EditArticleService {
  editNew: Subject<any> = new Subject<any>();  

  constructor() { }

  getEditNew()
  {    
    return this.editNew;
  }

  setEditNew(editPublish:any)
  {    
    return this.editNew.next(editPublish);    
  }

}
