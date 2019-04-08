import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EvaluationsSharedService {
  infoEvaluation: Subject<any> = new Subject<any>();
  infoViewEvaluation: Subject<any> = new Subject<any>();
  refreshEvaluation: Subject<any> = new Subject<any>();

  constructor() { }

  getInfoEvaluation() {
    return this.infoEvaluation;
  }

  setInfoEvaluation(Evaluation: any) {
    return this.infoEvaluation.next(Evaluation);
  }

  getInfoViewEvaluation() {
    return this.infoViewEvaluation;
  }

  setInfoViewEvaluation(viewEval: any) {
    return this.infoViewEvaluation.next(viewEval);
  }

  getRefreshEvaluationData() {
    return this.refreshEvaluation;
  }

  setRefreshEvaluationData(refresh: any) {
    return this.refreshEvaluation.next(refresh);
  }

}
