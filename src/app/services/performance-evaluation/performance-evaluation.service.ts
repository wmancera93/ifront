import { Injectable } from '@angular/core';
import { Angular2TokenService } from '../../../../node_modules/angular2-token';

@Injectable()
export class PerformanceEvaluationService {

  constructor(private tokenService: Angular2TokenService) { }

  getPerformanceEvaluations() {
    return this.tokenService.get('perfomance_evaluations/index_table')
      .map((data: any) => data.json());
  }

}
