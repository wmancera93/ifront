import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class PerformanceEvaluationService {

  constructor(public http: HttpClient, 
    private tokenService: Angular2TokenService) { }

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
