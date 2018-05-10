import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ButtonReturnService {
  dataButtonReturn: Subject<any> = new Subject<any>();  

  constructor() { }
  getButtonReturn() {
    return this.dataButtonReturn;
  }

  setButtonReturn(dataButtonReturn: any) {
    return this.dataButtonReturn.next(dataButtonReturn);
  }
}
