import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PerformanceEvalSharedService {
  exportEvaluationData: Subject<any> = new Subject<any>();
  exportEditEvaluationData: Subject<any> = new Subject<any>();
  editPlanningEvaluation: Subject<any> = new Subject<any>();
  refreshEvalConve:  Subject<any> = new Subject<any>();

  constructor() { }

  getEvaluationPerformanceData() {
    return this.exportEvaluationData;
  }

  setEvaluationPerformanceData(object: any) {
    return this.exportEvaluationData.next(object);
  }

  getViewEvaluationPerformanceData() {
    return this.exportEditEvaluationData;
  }

  setViewEvaluationPerformanceData(object: any) {
    return this.exportEditEvaluationData.next(object);
  }

  getPlanningEvaluationData() {
    return this.editPlanningEvaluation;
  }

  setPlanningEvaluationData(data: any) {
    return this.editPlanningEvaluation.next(data);
  }

  getRefrehsEval() {
    return this.refreshEvalConve;
  }

  setRefrehsEval(data: any) {
    return this.refreshEvalConve.next(data);
  }


}
