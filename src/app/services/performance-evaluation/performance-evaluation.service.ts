import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class PerformanceEvaluationService {

  constructor(private tokenService: Angular2TokenService) { }

  getPerformanceEvaluations() {
    return this.tokenService.get('perfomance_evaluations/index_table')
      .map((data: any) => data.json());
  }

    getEvaluationPerformanById(IdEvaluation:string) {
      return this.tokenService.get('perfomance_evaluations/'+ IdEvaluation)
        .map((data: any) => data.json());
    }
    getEvaluationObjetive() {
      return this.tokenService.get('evaluation_objetive')
        .map((data: any) => data.json());
    }
    postEvaluationObjetive() {
      return this.tokenService.get('evaluation_objetive')
        .map((data: any) => data.json());
    }
}
