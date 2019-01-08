import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrainingSharedService {
  dataTraining: Subject<any> = new Subject<any>();

  constructor() { }
  getDataTraining() {
    return this.dataTraining;
  }

  setDataTraining(infoTraining: any) {
    return this.dataTraining.next(infoTraining);
  }
}
