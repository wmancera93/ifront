import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class PerformanceEvaluationService {

  constructor(private tokenService: Angular2TokenService) { }

  getPerformanceEvaluations() {
    return this.tokenService.get('perfomance_evaluations/')
      .map((data: any) => data.json());
  }
  getPerformanceEvaluationstable() {
    return this.tokenService.get('perfomance_evaluations/index_table')
      .map((data: any) => data.json());
  }

  getEvaluationPerformanById(IdEvaluation: string) {
    return this.tokenService.get('perfomance_evaluations/' + IdEvaluation)
      .map((data: any) => data.json());
  }
  getEvaluationObjetive() {
    return this.tokenService.get('evaluation_objetive')
      .map((data: any) => data.json());
  }
  getEvaluationObjetiveByID(IdObjective) {
    return this.tokenService.get('erfomance_evaluations/detail/' + IdObjective)
      .map((data: any) => data.json());
  }
  postEvaluationObjetive(data) {
    return this.tokenService.post('evaluation_objetive', data)
      .map((data: any) => data.json());
  }
  putEvaluationObjetive(IdObjective, data) {
    return this.tokenService.put('evaluation_objetive/' + IdObjective, data)
      .map((data: any) => data.json());
  }
  deleteEvaluationObjetive(IdObjective) {
    return this.tokenService.delete('evaluation_objetive/' + IdObjective)
      .map((data: any) => data.json());
  }
}
