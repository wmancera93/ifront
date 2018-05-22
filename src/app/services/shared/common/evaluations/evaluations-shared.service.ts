import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EvaluationsSharedService {
  infoEvaluation: Subject<any> = new Subject<any>(); 

  constructor() { }

  getInfoEvaluation() {
    return this.infoEvaluation;
  }

  setInfoEvaluation(Evaluation: any) {
    return this.infoEvaluation.next(Evaluation);
  }

}
