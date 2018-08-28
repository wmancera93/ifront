import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataMasterSharedService {
  exportDataForm: Subject<any> = new Subject<any>();
  returnDataForm: Subject<any> = new Subject<any>();

  constructor() { }

  getDataFormDynamic() {
    return this.exportDataForm;
  }

  setDataFormDynamic(objectDataForm: any) {
    return this.exportDataForm.next(objectDataForm);
  }

  getReturnDataFormDynamic() {
    return this.returnDataForm;
  }

  setReturnDataFormDynamic(objectReturnDataForm: any) {
    return this.returnDataForm.next(objectReturnDataForm);
  }

}
