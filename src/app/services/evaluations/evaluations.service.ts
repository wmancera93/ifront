import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class EvaluationsService {

  constructor(private tokenService: Angular2TokenService) { }

  getEvaluationList() {
    return this.tokenService.get('evaluations')
      .map((data: any) => data.json());
  }

  getDataEvaluationById(id: number) {
    return this.tokenService.get('evaluations/' + id)
      .map((data: any) => data.json());
  }

  getShowEvaluation(id: number) {
    return this.tokenService.get('evaluations/see_detail/' + id)
      .map((data: any) => data.json());
  }

  postDataEvaluation(objectData: any, lengthArray: number) {
    console.log( { data: objectData, total_questions: lengthArray })
    return this.tokenService.post('evaluations', {data: objectData, total_questions: lengthArray})
      .map((data: any) => data.json());
  }

}

